import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import type { Event } from "../src/types/oddsApi";
import { fetchUpcomingEvents } from "./lib/oddsApi";

// Action to sync the schedule (costs 0 API credits)
export const syncUpcomingEvents = action({
  args: {},
  handler: async (ctx) => {
    try {
      const apiKey = process.env["ODDS_API_KEY"];
      if (!apiKey) throw new Error("Missing ODDS_API_KEY");

      // Calculate timestamps for the next 7 days
      const now = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(now.getDate() + 7);

      // The Odds API expects format "2023-09-09T00:00:00Z" (no milliseconds)
      const timeFrom = now.toISOString().split('.')[0] + 'Z';
      const timeTo = nextWeek.toISOString().split('.')[0] + 'Z';

      const targetLeagues = ["soccer_uefa_champs_league", "soccer_epl"];
      let totalImported = 0;

      for (const league of targetLeagues) {
        const data: Event[] = await fetchUpcomingEvents(
          apiKey,
          league,
          timeFrom,
          timeTo
        );
        const result = await ctx.runMutation(internal.games.importEvents, { rawData: data as any });
        totalImported += result.inserted;
      }
      
      return { success: true, count: totalImported };
    } catch (error: any) {
      console.error("Sync failed:", error);
      return { success: false, error: error.message };
    }
  },
});

export const getGames = query({
  args: {
    sportKey: v.optional(v.string()),
    group: v.optional(v.string()),
    status: v.optional(v.string()), // "LIVE", "UPCOMING", "ALL"
    limit: v.number(),
    offset: v.number(),
  },
  handler: async (ctx, args) => {
    let allGames;

    // Use specific indexes for performance
    if (args.status === "LIVE") {
      allGames = await ctx.db
        .query("games")
        .withIndex("by_isLive", (q) => q.eq("isLive", true))
        .collect();
    } else {
      allGames = await ctx.db
        .query("games")
        .withIndex("by_commenceTime")
        .collect();
    }

    // Filter by group OR sportKey
    let filtered = allGames;
    
    if (args.sportKey && args.sportKey !== "ALL_SPORTS") {
      filtered = filtered.filter(g => g.sportKey === args.sportKey);
    } else if (args.group && args.group !== "ALL_SPORTS") {
      const sportsInGroup = await ctx.db
        .query("sports")
        .filter((q) => q.eq(q.field("group"), args.group))
        .collect();
      
      const validSportKeys = new Set(sportsInGroup.map(s => s.key));
      filtered = filtered.filter(g => validSportKeys.has(g.sportKey));
    }

    // Filter by status if "UPCOMING" (LIVE is handled by index above)
    if (args.status === "UPCOMING") {
      filtered = filtered.filter(g => !g.isLive);
    }

    // Re-sort to ensure consistency if needed, though commenceTime index should handle it
    const total = filtered.length;
    const paginated = filtered.slice(args.offset, args.offset + args.limit);

    return {
      games: paginated,
      total
    };
  },
});

export const getGameById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();
  },
});

export const importEvents = internalMutation({
  args: { rawData: v.any() },
  handler: async (ctx, args) => {
    const events: Event[] = args.rawData;
    let inserted = 0;

    for (const match of events) {
      const existing = await ctx.db
        .query("games")
        .filter((q) => q.eq(q.field("id"), match.id))
        .first();

      if (!existing) {
        await ctx.db.insert("games", {
          id: match.id,
          homeTeam: match.home_team,
          awayTeam: match.away_team,
          league: match.sport_title || match.sport_key,
          sportKey: match.sport_key,
          commenceTime: new Date(match.commence_time).getTime(),
          isLive: false, // Default to false, can use a different endpoint to track live status later
        });
        inserted++;
      }
    }
    
    return { success: true, inserted };
  },
});
