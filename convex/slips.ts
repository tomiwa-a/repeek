import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const createSlip = mutation({
  args: {
    title: v.string(),
    price: v.number(),
    totalOdds: v.number(),
    analysisNote: v.optional(v.string()),
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
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || !user.username) throw new Error("User profile incomplete (missing username)");

    const stats = user.stats || { roi: 0, winRate: 0, totalPredictions: 0 };
    await ctx.db.patch(userId, {
      stats: {
        ...stats,
        totalPredictions: stats.totalPredictions + 1,
      }
    });

    const slipId = await ctx.db.insert("slips", {
      userId: userId,
      title: args.title,
      price: args.price,
      totalOdds: args.totalOdds,
      status: "OPEN",
      timestamp: Date.now(),
      legs: args.legs,
      analysisNote: args.analysisNote,
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
