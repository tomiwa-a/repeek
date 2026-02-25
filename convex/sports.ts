import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import type { Sport } from "../src/types/oddsApi";

const ODDS_API_URL = "https://api.the-odds-api.com/v4/sports/";

// Action to fetch sports from the API
export const seedSports = action({
  args: {},
  handler: async (ctx): Promise<any> => {
    const apiKey = process.env.ODDS_API_KEY;
    if (!apiKey) throw new Error("Missing ODDS_API_KEY");

    console.log("Fetching sports from The Odds API...");
    const response = await fetch(`${ODDS_API_URL}?apiKey=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from Odds API: ${response.statusText}`);
    }

    const data: Sport[] = await response.json();
    console.log(`Fetched ${data.length} sports. Saving to database...`);
    
    // Save to database
    const result: any = await ctx.runMutation(internal.sports.insertSports, { sportsData: data as any });
    
    return result;
  },
});

// Internal mutation to safely insert the sports
export const insertSports = internalMutation({
  args: { sportsData: v.any() },
  handler: async (ctx, args) => {
    const sports: Sport[] = args.sportsData;
    let inserted = 0;
    let skipped = 0;

    for (const sport of sports) {
      // Check if sport already exists to prevent duplicates
      const existing = await ctx.db
        .query("sports")
        .withIndex("by_key", (q) => q.eq("key", sport.key))
        .first();

      if (!existing) {
        await ctx.db.insert("sports", {
          key: sport.key,
          group: sport.group,
          title: sport.title,
          description: sport.description,
          active: sport.active,
          has_outrights: sport.has_outrights,
        });
        inserted++;
      } else {
        skipped++;
      }
    }

    return { 
      success: true, 
      message: `Finished seeding. Inserted: ${inserted}, Skipped (already existed): ${skipped}` 
    };
  },
});

// Query to get active sports for the frontend
export const getActiveSports = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("sports")
      .filter((q) => q.eq(q.field("active"), true))
      .collect();
  },
});
