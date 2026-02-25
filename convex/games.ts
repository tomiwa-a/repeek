import { action, internalMutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { v } from "convex/values";
import type { Event } from "../src/types/oddsApi";
import { fetchUpcomingEvents } from "./lib/oddsApi";

// Action to sync the schedule (costs 0 API credits)
export const syncUpcomingEvents = action({
  args: {},
  handler: async (ctx) => {
    try {
      // Example: We can iterate through active sports later. For now, just test Champions League.
      const data: Event[] = await fetchUpcomingEvents("soccer_uefa_champs_league");
      
      await ctx.runMutation(internal.games.importEvents, { rawData: data as any });
      
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
