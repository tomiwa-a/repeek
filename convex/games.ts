import { action, internalMutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { v } from "convex/values";

const ODDS_API_URL = "https://api.the-odds-api.com/v4/sports/soccer/odds/?regions=eu&markets=h2h&oddsFormat=decimal";

export const syncUpcomingGames = action({
  args: {},
  handler: async (ctx) => {
    const apiKey = process.env.ODDS_API_KEY;
    if (!apiKey) {
      throw new Error("Missing ODDS_API_KEY in environment variables");
    }

    try {
      const response = await fetch(`${ODDS_API_URL}&apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch from Odds API: ${response.statusText}`);
      }

      const data = await response.json();
      
      await ctx.runMutation(internal.games.importGames, { rawData: data });
      
      return { success: true, count: data.length };
    } catch (error: any) {
      console.error("Sync failed:", error);
      return { success: false, error: error.message };
    }
  },
});

export const getUpcomingGames = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("games")
      .withIndex("by_commenceTime")
      .order("asc")
      .take(50);
  },
});

export const importGames = internalMutation({
  args: { rawData: v.any() },
  handler: async (ctx, args) => {
    const games = args.rawData;

    for (const game of games) {
      const existing = await ctx.db
        .query("games")
        .filter((q) => q.eq(q.field("id"), game.id))
        .first();

      if (!existing) {
        const gameId = await ctx.db.insert("games", {
          id: game.id,
          homeTeam: game.home_team,
          awayTeam: game.away_team,
          league: game.sport_title,
          sportKey: game.sport_key,
          commenceTime: new Date(game.commence_time).getTime(),
          isLive: false,
        });

        if (game.bookmakers && game.bookmakers.length > 0) {
          const bookmaker = game.bookmakers[0];
          const market = bookmaker.markets.find((m: any) => m.key === "h2h");
          
          if (market) {
            const homeOdds = market.outcomes.find((o: any) => o.name === game.home_team)?.price;
            const awayOdds = market.outcomes.find((o: any) => o.name === game.away_team)?.price;
            const drawOdds = market.outcomes.find((o: any) => o.name === "Draw")?.price;

            await ctx.db.insert("odds", {
              gameId,
              bookmaker: bookmaker.title,
              lastUpdated: new Date(bookmaker.last_update).getTime(),
              markets: [{
                type: "h2h",
                home: homeOdds,
                away: awayOdds,
                draw: drawOdds,
              }]
            });
          }
        }
      }
    }
  },
});
