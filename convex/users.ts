import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

/** Returns null if valid, or a reason string if invalid. */
function validateUsername(username: string): string | null {
  if (username.length < 4 || username.length > 15) return "Must be 4-15 characters";
  if (!/^[a-z0-9_]+$/.test(username)) return "Only lowercase letters, numbers, and underscores";
  return null;
}

/** Returns the currently authenticated user's document. */
export const getViewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db.get(userId);
  },
});

/** Checks whether a username is valid and not taken. */
export const checkUsername = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    const reason = validateUsername(username);
    if (reason) return { available: false, reason };

    const existing = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", username))
      .first();

    return { available: !existing };
  },
});

/** Sets the username and marks onboarding complete for the current user. */
export const setUsername = mutation({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const reason = validateUsername(username);
    if (reason) throw new Error(reason);

    const existing = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", username))
      .first();

    if (existing) throw new Error("Username is already taken");

    await ctx.db.patch(userId, { username, onboardingComplete: true });
    return { success: true };
  },
});
