export async function fetchMetals() {
  const res = await fetch("https://api.metals.live/v1/spot");
  if (!res.ok) throw new Error("Failed to fetch metals data");
  return res.json();
}
