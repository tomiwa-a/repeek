import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createSlip = mutation({
  args: {
    predictorId: v.id("predictors"),
    title: v.string(),
    price: v.number(),
    totalOdds: v.number(),
    legs: v.array(
      v.object({
        gameId: v.id("games"),
        pickType: v.string(),
        odds: v.number(),
        analysis: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const slipId = await ctx.db.insert("slips", {
      predictorId: args.predictorId,
      title: args.title,
      price: args.price,
      totalOdds: args.totalOdds,
      status: "OPEN",
      timestamp: Date.now(),
      legs: args.legs,
    });

    for (const leg of args.legs) {
      const game = await ctx.db.get(leg.gameId);
      if (game) {
        await ctx.db.patch(leg.gameId, {
          slipCount: (game.slipCount ?? 0) + 1,
        });
      }
    }

    return slipId;
  },
});

export const getSlipsByGame = query({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    const allSlips = await ctx.db
      .query("slips")
      .withIndex("by_timestamp")
      .order("desc")
      .take(50);

    return allSlips.filter(slip => 
      slip.legs.some(leg => leg.gameId === args.gameId)
    );
  },
});

export const getLatestSlips = query({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("slips")
      .withIndex("by_timestamp")
      .order("desc")
      .take(args.limit);
  },
});
