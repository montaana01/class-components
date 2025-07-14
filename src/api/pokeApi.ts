export async function fetchAbilities() {
  const response = await fetch('https://pokeapi.co/api/v2/ability?limit=999');
  if (!response.ok) throw new Error('Error while data loading!');
  const data = await response.json();
  return data.results;
}
