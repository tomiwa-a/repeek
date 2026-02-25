import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  users: defineTable({
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),

    username: v.optional(v.string()),
    isPremium: v.optional(v.boolean()),
    onboardingComplete: v.optional(v.boolean()),
  })
    .index("email", ["email"])
    .index("by_username", ["username"]),

  sports: defineTable({
    key: v.string(),
    group: v.string(),
    title: v.string(),
    description: v.string(),
    active: v.boolean(),
    has_outrights: v.boolean(),
  }).index("by_key", ["key"]),

  games: defineTable({
    id: v.string(),
    homeTeam: v.string(),
    awayTeam: v.string(),
    league: v.string(),
    sportKey: v.string(),
    commenceTime: v.number(),
    isLive: v.boolean(),
    score: v.optional(
      v.object({
        home: v.number(),
        away: v.number(),
      })
    ),
  })
    .index("by_sportKey", ["sportKey"])
    .index("by_isLive", ["isLive"])
    .index("by_commenceTime", ["commenceTime"]),

  odds: defineTable({
    gameId: v.id("games"),
    bookmaker: v.string(),
    lastUpdated: v.number(),
    markets: v.array(
      v.object({
        type: v.string(),
        home: v.optional(v.number()),
        draw: v.optional(v.number()),
        away: v.optional(v.number()),
        over: v.optional(v.number()),
        under: v.optional(v.number()),
      })
    ),
  })
    .index("by_gameId", ["gameId"])
    .index("by_lastUpdated", ["lastUpdated"]),

  predictors: defineTable({
    username: v.string(),
    displayName: v.string(),
    avatarUrl: v.string(),
    isPremium: v.boolean(),
    stats: v.object({
      roi: v.number(),
      winRate: v.number(),
      totalPredictions: v.number(),
    }),
  }).index("by_username", ["username"]),

  slips: defineTable({
    predictorId: v.id("predictors"),
    title: v.string(),
    price: v.number(),
    totalOdds: v.number(),
    status: v.string(),
    timestamp: v.number(),
    legs: v.array(
      v.object({
        gameId: v.id("games"),
        pickType: v.string(),
        odds: v.number(),
        analysis: v.string(),
      })
    ),
  })
    .index("by_predictorId", ["predictorId"])
    .index("by_timestamp", ["timestamp"])
    .index("by_status", ["status"]),
});

