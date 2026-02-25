import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Internal utility to merge a duplicate Google-created user into an existing Password-created user.
 * 
 * Flow:
 * 1. Find the authAccount associated with the duplicateUser.
 * 2. Patch that authAccount to point to the originalUser.
 * 3. Delete the duplicateUser.
 */
export const mergeDuplicateUsers = internalMutation({
  args: {
    originalUserId: v.id("users"),
    duplicateUserId: v.id("users"),
  },
  handler: async (ctx, { originalUserId, duplicateUserId }) => {
    // 1. Find accounts for the duplicate user
    const accounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", duplicateUserId))
      .collect();

    for (const account of accounts) {
      // 2. Reparent the account
      await ctx.db.patch(account._id, { userId: originalUserId });
    }

    // 3. Delete sessions for the duplicate user (optional but cleaner)
    const sessions = await ctx.db
      .query("authSessions")
      .withIndex("userId", (q) => q.eq("userId", duplicateUserId))
      .collect();
    
    for (const session of sessions) {
      await ctx.db.delete(session._id);
    }

    // 4. Delete the duplicate user document
    await ctx.db.delete(duplicateUserId);

    return { success: true };
  },
});
