import { action, mutation, query } from "./_generated/server";
import { getAuthUserId, modifyAccountCredentials, invalidateSessions } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Scrypt } from "lucia";
import { api } from "./_generated/api";

export const getAuthStatus = query({
  args: {},
  handler: async (ctx, _args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return { hasPassword: false, isAnonymous: true, linkedProviders: [] };

    const accounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", userId))
      .collect();

    const linkedProviders = accounts.map(a => a.provider);
    const hasPassword = linkedProviders.includes("password");
    
    return { 
      hasPassword,
      isAnonymous: false,
      linkedProviders
    };
  },
});

export const unlinkProvider = mutation({
  args: { provider: v.string() },
  handler: async (ctx, { provider }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const accounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", userId))
      .collect();

    if (accounts.length <= 1) {
      throw new Error("Cannot unlink the last remaining authentication method. Add another provider first.");
    }

    const account = accounts.find(a => a.provider === provider);
    if (!account) throw new Error(`Account not found for provider: ${provider}`);

    await ctx.db.delete(account._id);
    
    return { success: true };
  },
});

export const updatePassword = action({
  args: { 
    currentPassword: v.string(),
    newPassword: v.string() 
  },
  handler: async (ctx, { currentPassword, newPassword }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const account = await ctx.runQuery(api.auth_logic.getAccountInfo, {});
    if (!account) throw new Error("No password account found");

    const isValid = await new Scrypt().verify(account.secret, currentPassword);
    if (!isValid) throw new Error("Current passcode is incorrect");

    await modifyAccountCredentials(ctx, {
      provider: "password",
      account: {
        id: account.providerAccountId,
        secret: newPassword,
      }
    });

    await invalidateSessions(ctx, { userId });

    return { success: true };
  },
});

export const getAccountInfo = query({
  args: {},
  handler: async (ctx, _args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const account = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", userId).eq("provider", "password"))
      .unique();

    if (!account) return null;

    return {
      providerAccountId: account.providerAccountId,
      secret: account.secret as string,
    };
  },
});
