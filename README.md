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
