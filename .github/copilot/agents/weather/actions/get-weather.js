const fetch = require("node-fetch");

module.exports = async (input) => {
  const { city } = input;

  // Simple city → coordinates map (only for POC)
  const map = {
    Chennai: { lat: 13.0827, lon: 80.2707 },
    Delhi: { lat: 28.7041, lon: 77.1025 },
    Mumbai: { lat: 19.0760, lon: 72.8777 }
  };

  if (!map[city]) {
    return {
      city,
      temperature: null,
      condition: "City not supported in demo"
    };
  }

  const { lat, lon } = map[city];

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    city,
    temperature: data.current_weather.temperature,
    condition: data.current_weather.weathercode.toString()
  };
};
