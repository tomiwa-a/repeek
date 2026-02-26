/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as auth_logic from "../auth_logic.js";
import type * as games from "../games.js";
import type * as http from "../http.js";
import type * as internal_migrations from "../internal_migrations.js";
import type * as leaderboard from "../leaderboard.js";
import type * as lib_oddsApi from "../lib/oddsApi.js";
import type * as slips from "../slips.js";
import type * as sports from "../sports.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  auth_logic: typeof auth_logic;
  games: typeof games;
  http: typeof http;
  internal_migrations: typeof internal_migrations;
  leaderboard: typeof leaderboard;
  "lib/oddsApi": typeof lib_oddsApi;
  slips: typeof slips;
  sports: typeof sports;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
