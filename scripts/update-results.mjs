// Fetches finished World Cup match scores from football-data.org and writes
// them to results.json. Run by .github/workflows/update-results.yml.
// Needs the env var FOOTBALL_DATA_TOKEN (stored as a GitHub Actions secret).
//
// It only writes scores. It never reads or changes data.js, so your owners,
// odds and void picks are always safe.

import { writeFileSync } from "node:fs";

const TOKEN = process.env.FOOTBALL_DATA_TOKEN;
if (!TOKEN) {
  console.error("Missing FOOTBALL_DATA_TOKEN secret.");
  process.exit(1);
}

// The exact team names used in data.js.
const OUR_TEAMS = [
  "Mexico", "South Africa", "Korea Republic", "Czechia",
  "Canada", "Switzerland", "Qatar", "Bosnia & Herzegovina",
  "Brazil", "Morocco", "Haiti", "Scotland",
  "United States", "Paraguay", "Australia", "Türkiye",
  "Germany", "Curaçao", "Côte d'Ivoire", "Ecuador",
  "Netherlands", "Japan", "Tunisia", "Sweden",
  "Belgium", "Egypt", "Iran", "New Zealand",
  "Spain", "Cabo Verde", "Saudi Arabia", "Uruguay",
  "France", "Senegal", "Norway", "Iraq",
  "Argentina", "Algeria", "Austria", "Jordan",
  "Portugal", "Uzbekistan", "Colombia", "DR Congo",
  "England", "Croatia", "Ghana", "Panama"
];

// Names the API might use that differ from ours (normalised -> our name).
const ALIASES = {
  southkorea: "Korea Republic",
  republicofkorea: "Korea Republic",
  turkey: "Türkiye",
  czechrepublic: "Czechia",
  bosniaandherzegovina: "Bosnia & Herzegovina",
  bosniaherzegovina: "Bosnia & Herzegovina",
  ivorycoast: "Côte d'Ivoire",
  capeverde: "Cabo Verde",
  capeverdeislands: "Cabo Verde",
  congodr: "DR Congo",
  drcongo: "DR Congo",
  democraticrepublicofthecongo: "DR Congo",
  democraticrepublicofcongo: "DR Congo",
  usa: "United States",
  unitedstatesofamerica: "United States",
  iriran: "Iran",
  islamicrepublicofiran: "Iran"
};

const norm = (s) =>
  String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");

const lookup = {};
OUR_TEAMS.forEach((t) => { lookup[norm(t)] = t; });
Object.entries(ALIASES).forEach(([k, v]) => { lookup[k] = v; });
const toOurs = (name) => lookup[norm(name)] || null;

const res = await fetch("https://api.football-data.org/v4/competitions/WC/matches", {
  headers: { "X-Auth-Token": TOKEN }
});
if (!res.ok) {
  console.error(`API error ${res.status}: ${await res.text()}`);
  console.error("If this is a 403/404, your free key may not include the World Cup competition.");
  process.exit(1);
}

const data = await res.json();
const results = {};
const unmatched = new Set();
let finished = 0;

for (const m of data.matches || []) {
  if (m.status !== "FINISHED") continue;
  const h = toOurs(m.homeTeam?.name || "");
  const a = toOurs(m.awayTeam?.name || "");
  const hg = m.score?.fullTime?.home;
  const ag = m.score?.fullTime?.away;
  if (!h) unmatched.add(m.homeTeam?.name);
  if (!a) unmatched.add(m.awayTeam?.name);
  if (!h || !a || hg == null || ag == null) continue;
  results[`${h}|${a}`] = { score: `${hg}-${ag}`, played: true };
  finished++;
}

const out = {
  updated: new Date().toISOString().slice(0, 10),
  source: "football-data.org",
  results
};
writeFileSync("results.json", JSON.stringify(out, null, 2) + "\n");

console.log(`Wrote ${finished} finished match(es) to results.json.`);
if (unmatched.size) {
  console.warn("Team names the script could not map (add to ALIASES):", [...unmatched].join(", "));
}
