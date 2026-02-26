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

    const stats = user.stats || { roi: 0, winRate: 0, totalSlips: 0, totalGames: 0 };
    await ctx.db.patch(userId, {
      stats: {
        ...stats,
        totalSlips: stats.totalSlips + 1,
        totalGames: stats.totalGames + args.legs.length,
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
      .collect();

    const filteredSlips = allSlips.filter(slip => 
      slip.legs.some(leg => leg.gameId === args.gameId)
    );

    return await Promise.all(
      filteredSlips.map(async (slip) => {
        const user = await ctx.db.get(slip.userId);
        const legs = await Promise.all(
          slip.legs.map(async (leg) => {
            const game = await ctx.db.get(leg.gameId);
            return {
              ...leg,
              game,
            };
          })
        );
        return {
          ...slip,
          predictor: {
            id: user?._id || "unknown",
            username: user?.username || "ANONYMOUS",
            displayName: user?.name || user?.username || "Operator",
            avatarUrl: user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (user?.username || "anon"),
            isPremium: user?.isPremium || false,
            winRate: user?.stats?.winRate || 0,
            totalSlips: user?.stats?.totalSlips || 0,
            totalGames: user?.stats?.totalGames || 0,
            wins: 0,
            losses: 0,
            followers: 0,
            streak: 0,
            streakType: "win" as "win" | "loss",
            isFeatured: false,
            specialties: [],
          },
          legs,
        };
      })
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
export const getSlipsByUser = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    let userId: any = args.userId;
    if (!userId) {
      userId = await getAuthUserId(ctx);
    }
    if (!userId) return [];

    const slips = await ctx.db
      .query("slips")
      .withIndex("by_userId", (q) => q.eq("userId", userId!))
      .order("desc")
      .collect();

    const hydratedSlips = await Promise.all(
      slips.map(async (slip) => {
        const user = await ctx.db.get(slip.userId);
        const legs = await Promise.all(
          slip.legs.map(async (leg) => {
            const game = await ctx.db.get(leg.gameId);
            return {
              ...leg,
              game,
            };
          })
        );
        return {
          ...slip,
          predictor: {
            id: user?._id || "unknown",
            username: user?.username || "ANONYMOUS",
            displayName: user?.name || user?.username || "Operator",
            avatarUrl: user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (user?.username || "anon"),
            isPremium: user?.isPremium || false,
            winRate: user?.stats?.winRate || 0,
            totalSlips: user?.stats?.totalSlips || 0,
            totalGames: user?.stats?.totalGames || 0,
            wins: 0,
            losses: 0,
            followers: 0,
            streak: 0,
            streakType: "win" as "win" | "loss",
            isFeatured: false,
            specialties: [],
          },
          legs,
        };
      })
    );

    return hydratedSlips;
  },
});
