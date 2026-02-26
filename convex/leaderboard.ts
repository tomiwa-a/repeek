import { query } from "./_generated/server";
import { v } from "convex/values";

export const getTopAnalysts = query({
  args: {
    sortBy: v.optional(v.union(v.literal("winRate"), v.literal("roi"), v.literal("totalSlips"))),
    sportKey: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const sortBy = args.sortBy ?? "winRate";
    const limit = args.limit ?? 20;

    let usersQuery;
    
    if (sortBy === "winRate") {
      usersQuery = ctx.db.query("users").withIndex("by_winRate");
    } else if (sortBy === "roi") {
      usersQuery = ctx.db.query("users").withIndex("by_roi");
    } else {
      usersQuery = ctx.db.query("users").withIndex("by_totalSlips");
    }

    const users = await usersQuery.order("desc").take(limit);

    // Filter by sport if requested
    // For now, we'll return the top users directly as the 'specialties' 
    // field isn't fully implemented in the schema yet.
    // Filtering by sport Key can be added here in the future.

    const analysts = await Promise.all(users.map(async (user) => {
      const activeSlips = await ctx.db
        .query("slips")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .filter((q) => q.eq(q.field("status"), "OPEN"))
        .first();

      return {
        id: user._id,
        username: user.username || "ANONYMOUS",
        displayName: user.username || "Anonymous Operator",
        avatar: user.image,
        avatarUrl: user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || user._id}`,
        winRate: user.stats?.winRate ?? 0,
        totalSlips: user.stats?.totalSlips ?? 0,
        totalGames: user.stats?.totalGames ?? 0,
        roi: user.stats?.roi ?? 0,
        wins: 0,
        losses: 0,
        streak: 0,
        streakType: "win" as const,
        followers: 0,
        isPremium: user.isPremium ?? false,
        isFeatured: false,
        hasActiveSlips: !!activeSlips,
        specialties: [],
      };
    }));

    return analysts;
  },
});
