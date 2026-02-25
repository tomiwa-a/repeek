import { action, query } from "./_generated/server";
import { getAuthUserId, modifyAccountCredentials, invalidateSessions } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Scrypt } from "lucia";
import { api } from "./_generated/api";

export const getAuthStatus = query({
  args: {},
  handler: async (ctx, _args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return { hasPassword: false, isAnonymous: true };

    const accounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", userId))
      .collect();

    const hasPassword = accounts.some((a) => a.provider === "password");
    
    return { 
      hasPassword,
      isAnonymous: false 
    };
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
