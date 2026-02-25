/**
 * Standard usage headers returned by The Odds API on every request
 */
export interface OddsApiHeaders {
  /** The usage credits remaining until the quota resets */
  'x-requests-remaining': string;
  /** The usage credits used since the last quota reset */
  'x-requests-used': string;
  /** The usage cost of the last API call */
  'x-requests-last': string;
}
