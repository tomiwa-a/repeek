import { Password } from "@convex-dev/auth/providers/Password";
import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";
import type { DataModel } from "./_generated/dataModel";
import type { GenericMutationCtx } from "convex/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password,
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async createOrUpdateUser(ctx: GenericMutationCtx<DataModel>, args) {
      const { profile, existingUserId } = args;
      
      if (existingUserId) return existingUserId;

      if (profile.email) {
        const existingUser = await ctx.db
          .query("users")
          .withIndex("email", (q) => q.eq("email", profile.email as string))
          .unique();

        if (existingUser) {
          await ctx.db.patch(existingUser._id, {
            ...profile,
            emailVerificationTime: (profile.emailVerificationTime as number) ?? Date.now(),
          });
          return existingUser._id;
        }
      }

      return await ctx.db.insert("users", profile);
    },
  },
});
