/**
 * Represents the response from:
 * GET https://api.the-odds-api.com/v4/sports/
 */
export interface Sport {
  /** The internal key used for API routing (e.g., "americanfootball_ncaaf") */
  key: string;
  /** Broad category (e.g., "American Football") */
  group: string;
  /** Display title (e.g., "NCAAF") */
  title: string;
  /** Full description (e.g., "US College Football") */
  description: string;
  /** Is the sport currently active and offering odds? */
  active: boolean;
  /** Does the sport support outright/futures betting? */
  has_outrights: boolean;
}
