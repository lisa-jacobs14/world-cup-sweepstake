# Family World Cup 2026 Sweepstake 🏆

A little static website showing the fixtures, everyone's team picks, the odds,
and a live scoreboard of who's still in.

## Files

| File | What it is | Do you edit it? |
|------|-----------|-----------------|
| `index.html` | The page itself | No |
| `styles.css` | The look & feel | No |
| `app.js` | The code that builds the page | No |
| **`data.js`** | **All the teams, odds, fixtures & results** | **Yes — this is the only one** |

## Previewing it on your own computer

Double-click **`index.html`** — it opens in your browser. That's it, no install needed.
(This only works on *your* machine. To let the family see it, publish it — see below.)

## Updating it during the tournament

Open **`data.js`** in any text editor (Notepad is fine). Everything is labelled.

- **Update odds** → change the `odds` value, e.g. `odds: "5/1"`.
- **Mark a team knocked out** → change `status: "in"` to `status: "out"`.
  It'll automatically grey out everywhere and update the scoreboard.
- **Add a result** → on a fixture, set `played: true` and `score: "2-1"`.
- **Add a fixture** → copy any fixture line and edit the date/teams/time.
- Change `lastUpdated` at the top so people know it's fresh.

Save the file and refresh the browser. If you've published to GitHub Pages,
re-upload `data.js` (or commit it) and the live site updates.

## Publishing so the whole family can see it (GitHub Pages — free)

You do **not** need to install anything — this can all be done in your web browser.

1. Go to **github.com** and create a free account (if you don't have one).
2. Click **New repository**. Name it e.g. `world-cup-sweepstake`,
   set it to **Public**, and click **Create repository**.
3. On the new repo page, click **"uploading an existing file"**.
   Drag in all the files from this folder (`index.html`, `styles.css`,
   `app.js`, `data.js`, this README). Click **Commit changes**.
4. Go to the repo's **Settings → Pages**.
5. Under **Branch**, choose **main** and **/ (root)**, then **Save**.
6. Wait ~1 minute. Your site appears at:
   `https://YOUR-USERNAME.github.io/world-cup-sweepstake/`
7. Share that link with the family. 🎉

**To update later:** edit `data.js` on your computer, then on GitHub go to the
file, click the pencil ✏️ (or re-upload it), and commit. The live site refreshes
within a minute.

> Tip: keep a backup copy of `data.js` somewhere safe before big edits.

## Automatic score updates (optional)

There's a GitHub Action (`.github/workflows/update-results.yml`) that fetches
finished match scores every hour and writes them to `results.json`. The page
merges those scores in automatically, so Fixtures, Standings and the Scoreboard
update themselves. It only ever writes `results.json` — it never touches
`data.js`, so your owners, odds and void picks are safe.

**One-time setup:**
1. Get a free API key from https://www.football-data.org/client/register
2. In your repo: **Settings → Secrets and variables → Actions → New repository
   secret**. Name it exactly `FOOTBALL_DATA_TOKEN`, paste the key, save.
3. Add these files to the repo: `results.json`, `scripts/update-results.mjs`,
   `.github/workflows/update-results.yml`.
4. Go to the **Actions** tab, pick **Update scores**, click **Run workflow** to
   test it now (otherwise it runs hourly).

If a run logs "could not map" a team name, add that spelling to the `ALIASES`
list in `scripts/update-results.mjs`. Odds and knockout `status` stay manual.

## Group standings tab

The **Standings** tab builds the 12 group tables (P/W/D/L/GF/GA/GD/Pts)
automatically from match scores — nothing extra to maintain. Top two in each
group are highlighted as qualifiers.
