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
      // Calculate timestamps for the next 7 days
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
