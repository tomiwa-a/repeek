import type { Sport, GameOdds, Event } from "../../src/types/oddsApi";

const BASE_URL = "https://api.the-odds-api.com/v4";

export async function fetchSports(apiKey: string): Promise<Sport[]> {
  const response = await fetch(`${BASE_URL}/sports/?apiKey=${apiKey}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch sports from Odds API: ${response.statusText}`);
  }
  
  return await response.json();
}

export async function fetchUpcomingEvents(
  apiKey: string,
  sportKey: string = "soccer_uefa_champs_league",
  commenceTimeFrom?: string,
  commenceTimeTo?: string
): Promise<Event[]> {
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

export async function fetchGameOdds(
  apiKey: string,
  sportKey: string,
  eventIds: string[]
): Promise<GameOdds[]> {
  if (!eventIds || eventIds.length === 0) {
    return []; 
  }
  
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

