import type { Sport, GameOdds, Event } from "../../src/types/oddsApi";

const BASE_URL = "https://api.the-odds-api.com/v4";

/**
 * Validates and retrieves the Odds API Key from the environment.
 */
function getApiKey(): string {
  const apiKey = process.env.ODDS_API_KEY;
  if (!apiKey) {
    throw new Error("Missing ODDS_API_KEY in environment variables");
  }
  return apiKey;
}

/**
 * Fetches the active list of sports from The Odds API.
 * @returns Array of Sport objects.
 */
export async function fetchSports(): Promise<Sport[]> {
  const apiKey = getApiKey();
  const response = await fetch(`${BASE_URL}/sports/?apiKey=${apiKey}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch sports from Odds API: ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * Fetches the upcoming games (fixtures) for a specific sport.
 * NOTE: This endpoint costs 0 usage quota credits.
 * @param sportKey The key of the sport to fetch (e.g., 'soccer_uefa_champs_league')
 * @param commenceTimeFrom Optional ISO 8601 string to fetch games on or after this time.
 * @param commenceTimeTo Optional ISO 8601 string to fetch games on or before this time.
 * @returns Array of Event objects (without odds).
 */
export async function fetchUpcomingEvents(
  sportKey: string = "soccer_uefa_champs_league",
  commenceTimeFrom?: string,
  commenceTimeTo?: string
): Promise<Event[]> {
  const apiKey = getApiKey();
  
  const params = new URLSearchParams({ apiKey });
  
  if (commenceTimeFrom) {
    params.append("commenceTimeFrom", commenceTimeFrom);
  }
  if (commenceTimeTo) {
    params.append("commenceTimeTo", commenceTimeTo);
  }

  const url = `${BASE_URL}/sports/${sportKey}/events?${params.toString()}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch events from Odds API: ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * Fetches the odds for specific games in a sport.
 * NOTE: This endpoint costs 3 quota credits (1 region * 3 markets).
 * @param sportKey The key of the sport to fetch (e.g., 'soccer_uefa_champs_league')
 * @param eventIds Array of specific match IDs to fetch odds for.
 * @returns Array of GameOdds objects.
 */
export async function fetchGameOdds(
  sportKey: string,
  eventIds: string[]
): Promise<GameOdds[]> {
  if (!eventIds || eventIds.length === 0) {
    return []; 
  }

  const apiKey = getApiKey();
  
  const params = new URLSearchParams({
    apiKey,
    regions: "uk", 
    markets: "h2h,spreads,totals", 
    eventIds: eventIds.join(","), 
    includeLinks: "true",
    includeSids: "true",
    includeBetLimits: "true"
  });

  const url = `${BASE_URL}/sports/${sportKey}/odds?${params.toString()}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch odds from Odds API: ${response.statusText}`);
  }
  
  return await response.json();
}
