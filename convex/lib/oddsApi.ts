import type { Sport, GameOdds } from "../../src/types/oddsApi";

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
 * Fetches the upcoming games and odds for a specific sport.
 * @param sportKey The key of the sport to fetch (e.g., 'soccer', 'americanfootball_nfl')
 * @returns Array of GameOdds objects.
 */
export async function fetchUpcomingGames(sportKey: string = "soccer"): Promise<GameOdds[]> {
  const apiKey = getApiKey();
  
  // You can adjust regions (eu, us, uk, au) depending on where you want the prices from
  const url = `${BASE_URL}/sports/${sportKey}/odds/?regions=eu,us&markets=h2h&oddsFormat=decimal&apiKey=${apiKey}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch games from Odds API: ${response.statusText}`);
  }
  
  return await response.json();
}
