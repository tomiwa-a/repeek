import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import type { Sport } from "../src/types/oddsApi";
import { fetchSports } from "./lib/oddsApi";

export const seedSports = action({
  args: {},
  handler: async (ctx): Promise<any> => {
    const data: Sport[] = await fetchSports();
    const result: any = await ctx.runMutation(internal.sports.insertSports, { sportsData: data as any });
    
    return result;
  },
});

export const insertSports = internalMutation({
  args: { sportsData: v.any() },
  handler: async (ctx, args) => {
    const sports: Sport[] = args.sportsData;
    let inserted = 0;
    let skipped = 0;

    for (const sport of sports) {
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
      message: `Finished seeding. Inserted: ${inserted}, Skipped: ${skipped}` 
    };
  },
});

export const getActiveSports = query({
  args: {
    groups: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const sports = await ctx.db
      .query("sports")
      .filter((q) => q.eq(q.field("active"), true))
      .collect();

    if (args.groups && args.groups.length > 0) {
      return sports.filter((sport) => args.groups!.includes(sport.group));
    }

    return sports;
  },
});

export const getActiveSportGroups = query({
  args: {},
  handler: async (ctx) => {
    const sports = await ctx.db
      .query("sports")
      .filter((q) => q.eq(q.field("active"), true))
      .collect();

    const uniqueGroups = new Set(sports.map((sport) => sport.group));
    return Array.from(uniqueGroups).sort();
  },
});
