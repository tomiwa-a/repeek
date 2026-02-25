import { action, internalMutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { v } from "convex/values";
import type { GameOdds, Bookmaker, Market, Outcome } from "../src/types/oddsApi";
import { fetchUpcomingGames } from "./lib/oddsApi";

export const syncUpcomingGames = action({
  args: {},
  handler: async (ctx) => {
    try {
      // For MVP, we'll fetch soccer. Later we can pass sportKey as an arg.
      const data: GameOdds[] = await fetchUpcomingGames("soccer");
      
      await ctx.runMutation(internal.games.importGames, { rawData: data as any });
      
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
    const games: GameOdds[] = args.rawData;

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
          league: game.sport_title || game.sport_key, // Fallback if title is missing
          sportKey: game.sport_key,
          commenceTime: new Date(game.commence_time).getTime(),
          isLive: false,
        });

        if (game.bookmakers && game.bookmakers.length > 0) {
          const bookmaker: Bookmaker = game.bookmakers[0];
          const market: Market | undefined = bookmaker.markets.find((m) => m.key === "h2h");
          
          if (market) {
            const homeOdds = market.outcomes.find((o) => o.name === game.home_team)?.price;
            const awayOdds = market.outcomes.find((o) => o.name === game.away_team)?.price;
            const drawOdds = market.outcomes.find((o) => o.name === "Draw")?.price;

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
