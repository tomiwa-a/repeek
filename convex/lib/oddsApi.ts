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
 * @param sportKey The key of the sport to fetch (e.g., 'soccer', 'americanfootball_nfl')
 * @returns Array of Event objects (without odds).
 */
export async function fetchUpcomingEvents(sportKey: string = "soccer_uefa_champs_league"): Promise<Event[]> {
  const apiKey = getApiKey();
  const url = `${BASE_URL}/sports/${sportKey}/events?apiKey=${apiKey}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch events from Odds API: ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * Fetches the odds for games in a specific sport.
 * NOTE: This endpoint costs 1 quota credit per region per market.
 * @param sportKey The key of the sport to fetch (e.g., 'soccer', 'americanfootball_nfl')
 * @returns Array of GameOdds objects.
 */
export async function fetchGameOdds(sportKey: string = "soccer_uefa_champs_league"): Promise<GameOdds[]> {
  const apiKey = getApiKey();
  
  // You can adjust regions (eu, us, uk, au) depending on where you want the prices from
  const url = `${BASE_URL}/sports/${sportKey}/odds/?regions=eu,us&markets=h2h&oddsFormat=decimal&apiKey=${apiKey}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch games from Odds API: ${response.statusText}`);
  }
  
  return await response.json();
}
