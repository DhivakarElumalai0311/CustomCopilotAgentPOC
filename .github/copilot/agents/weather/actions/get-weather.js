import fetch from "node-fetch";

export default async function getWeather({ city }) {
  const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather API failed: ${res.status}`);
  }

  const json = await res.json();

  const current = json.current_condition?.[0];
  return {
    city,
    temperature: current.temp_C + "°C",
    condition: current.weatherDesc[0].value
  };
}
