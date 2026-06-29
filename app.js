/* Family World Cup 2026 Sweepstake — renderer.
   You shouldn't need to touch this file. All content lives in data.js */

(function () {
  const DATA = window.SWEEPSTAKE;
  if (!DATA) { document.body.innerHTML = "<p style='padding:20px'>Couldn't load data.js</p>"; return; }

  const $ = (id) => document.getElementById(id);

  /* ---------- Header ---------- */
  $("site-title").textContent   = DATA.meta.title;
  $("site-subtitle").textContent = DATA.meta.subtitle;
  $("last-updated").textContent  = DATA.meta.lastUpdated;
  document.title = DATA.meta.title;

  const teams = DATA.teams;
  const teamByName = Object.fromEntries(teams.map(t => [t.name, t]));
  const ownerOf = (name) => (teamByName[name] ? teamByName[name].owner : "");

  // Teams knocked out in the knockout rounds, derived live from results.json.
  // Filled in by boot() after the feed is merged.
  let koEliminated = new Set();

  // A team is "out" if data.js says so OR it lost a knockout match.
  const isOut = (name) => {
    const t = teamByName[name];
    return (t && t.status === "out") || koEliminated.has(name);
  };

  // Friendly names + ordering for the knockout rounds.
  const STAGE_LABELS = {
    LAST_32: "Round of 32",
    LAST_16: "Round of 16",
    QUARTER_FINALS: "Quarter-finals",
    SEMI_FINALS: "Semi-finals",
    THIRD_PLACE: "Third-place play-off",
    FINAL: "Final"
  };
  const STAGE_ORDER = ["LAST_32", "LAST_16", "QUARTER_FINALS", "SEMI_FINALS", "THIRD_PLACE", "FINAL"];

  /* ---------- Tabs ---------- */
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      $(btn.dataset.tab).classList.add("active");
    });
  });

  const fmtDate = (iso) => {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  };

  /* ---------- Fixtures ---------- */
  function renderFixtures() {
    const el = $("fixtures");
    const fixtures = [...DATA.fixtures].sort((a, b) =>
      (a.date + a.ukTime).localeCompare(b.date + b.ukTime));

    let html = '<h2 class="section-title">Fixtures</h2>';
    html += '<p class="note">Kick-off times are UK time (BST). Add more games or results in <strong>data.js</strong> as the tournament unfolds.</p>';

    let currentDay = "";
    fixtures.forEach(f => {
      if (f.date !== currentDay) {
        currentDay = f.date;
        html += `<h3 class="day-heading">${fmtDate(f.date)}</h3>`;
      }
      const scoreBlock = f.played && f.score
        ? `<span class="score">${f.score}</span>`
        : `<span class="ko">${f.ukTime}</span>`;
      html += `
        <div class="card">
          <div class="fixture-meta">
            <span class="pill">Group ${f.group}</span>
            <span>${f.played ? "Full time" : "Kick-off " + f.ukTime}</span>
          </div>
          <div class="fixture">
            <div class="team home">${f.home}<div class="owner-tag">${ownerOf(f.home) || "—"}</div></div>
            <div class="mid">${scoreBlock}</div>
            <div class="team away">${f.away}<div class="owner-tag">${ownerOf(f.away) || "—"}</div></div>
          </div>
        </div>`;
    });
    el.innerHTML = html;
  }

  /* ---------- Selections ---------- */
  function renderSelections() {
    const el = $("selections");
    const people = {};
    teams.forEach(t => { (people[t.owner] = people[t.owner] || []).push(t); });
    (DATA.voidPicks || []).forEach(v => {
      (people[v.owner] = people[v.owner] || []).push({ name: v.name, void: true, note: v.note });
    });

    const names = Object.keys(people).sort((a, b) => a.localeCompare(b));
    let html = '<h2 class="section-title">Who has who</h2>';
    html += `<p class="note">${names.length} players · ${teams.length} teams in the draw. Crossed-out chips are knocked out.</p>`;

    names.forEach(name => {
      const picks = people[name].sort((a, b) => a.name.localeCompare(b.name));
      const chips = picks.map(t => {
        if (t.void) return `<span class="team-chip void" title="${t.note}">${t.name} (void)</span>`;
        const out = isOut(t.name);
        return `<span class="team-chip ${out ? "out" : ""}">
                  <span class="dot ${out ? "out" : "in"}"></span>${t.name}
                </span>`;
      }).join("");
      html += `<div class="card person-card"><h3>${name}</h3>${chips}</div>`;
    });
    el.innerHTML = html;
  }

  /* ---------- Odds ---------- */
  function renderOdds() {
    const el = $("odds");
    const sorted = [...teams].sort((a, b) => oddsValue(a.odds) - oddsValue(b.odds));
    let html = '<h2 class="section-title">Outright odds</h2>';
    html += '<p class="note">Tournament-winner odds, shortest first. Update the <strong>odds</strong> field in data.js as prices move.</p>';
    html += '<table><thead><tr><th>Team</th><th>Group</th><th>Owner</th><th class="num">Odds</th><th>Status</th></tr></thead><tbody>';
    sorted.forEach(t => {
      const out = isOut(t.name);
      html += `<tr class="${out ? "knocked" : ""}">
        <td>${t.name}</td>
        <td>${t.group}</td>
        <td>${t.owner}</td>
        <td class="num">${t.odds}</td>
        <td class="${out ? "status-out" : "status-in"}">${out ? "OUT" : "In"}</td>
      </tr>`;
    });
    html += '</tbody></table>';
    el.innerHTML = html;
  }

  // Convert "5/1" or "9/2" to a number so we can sort favourites first.
  function oddsValue(odds) {
    if (!odds) return 99999;
    const parts = String(odds).split("/");
    if (parts.length === 2) {
      const n = parseFloat(parts[0]), d = parseFloat(parts[1]);
      if (d) return n / d;
    }
    const f = parseFloat(odds);
    return isNaN(f) ? 99999 : f;
  }

  /* ---------- Group standings ---------- */
  function renderStandings() {
    const el = $("standings");

    // One blank row per team, plus a lookup of which teams are in each group.
    const groups = {};
    const rows = {};
    teams.forEach(t => {
      (groups[t.group] = groups[t.group] || []).push(t.name);
      rows[t.name] = { name: t.name, owner: t.owner, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
    });

    // Tally every played fixture that has a real "X-Y" score.
    let playedCount = 0;
    DATA.fixtures.forEach(f => {
      if (!f.played) return;
      const m = /^(\d+)\s*-\s*(\d+)$/.exec(String(f.score).trim());
      if (!m) return;
      const H = rows[f.home], A = rows[f.away];
      if (!H || !A) return;
      const hg = +m[1], ag = +m[2];
      playedCount++;
      H.p++; A.p++;
      H.gf += hg; H.ga += ag; A.gf += ag; A.ga += hg;
      if (hg > ag) { H.w++; A.l++; H.pts += 3; }
      else if (hg < ag) { A.w++; H.l++; A.pts += 3; }
      else { H.d++; A.d++; H.pts++; A.pts++; }
    });

    let html = '<h2 class="section-title">Group standings</h2>';
    html += playedCount === 0
      ? '<p class="note">No results entered yet. As you add scores (set <strong>played: true</strong> and e.g. <strong>score: "2-1"</strong> in data.js) these tables fill in automatically. Top two in each group qualify.</p>'
      : '<p class="note">Calculated live from match results. The top two in each group (highlighted) qualify automatically; the best third-placed teams also progress.</p>';

    Object.keys(groups).sort().forEach(g => {
      const table = groups[g].map(n => rows[n]).sort((a, b) =>
        b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf || a.name.localeCompare(b.name));

      html += `<h3 class="day-heading">Group ${g}</h3>`;
      html += '<table class="standings-table"><thead><tr>' +
              '<th class="num">#</th><th>Team</th><th>Owner</th>' +
              '<th class="num">P</th><th class="num">W</th><th class="num">D</th><th class="num">L</th>' +
              '<th class="num">GF</th><th class="num">GA</th><th class="num">GD</th><th class="num">Pts</th>' +
              '</tr></thead><tbody>';
      table.forEach((r, i) => {
        const gd = r.gf - r.ga;
        const out = isOut(r.name);
        const cls = [i < 2 ? "qualify" : "", out ? "knocked" : ""].join(" ").trim();
        html += `<tr class="${cls}">
          <td class="num">${i + 1}</td>
          <td>${r.name}</td>
          <td>${r.owner}</td>
          <td class="num">${r.p}</td>
          <td class="num">${r.w}</td>
          <td class="num">${r.d}</td>
          <td class="num">${r.l}</td>
          <td class="num">${r.gf}</td>
          <td class="num">${r.ga}</td>
          <td class="num">${gd > 0 ? "+" : ""}${gd}</td>
          <td class="num"><strong>${r.pts}</strong></td>
        </tr>`;
      });
      html += '</tbody></table>';
    });
    el.innerHTML = html;
  }

  /* ---------- Scoreboard ---------- */
  function renderScoreboard() {
    const el = $("scoreboard");
    const people = {};
    teams.forEach(t => {
      const p = people[t.owner] = people[t.owner] || { in: [], out: [] };
      (isOut(t.name) ? p.out : p.in).push(t.name);
    });

    const totalOut = teams.filter(t => isOut(t.name)).length;
    const totalIn = teams.length - totalOut;

    const standings = Object.entries(people)
      .map(([name, p]) => ({ name, in: p.in.length, out: p.out.length, teams: p.in.length + p.out.length, inList: p.in, outList: p.out }))
      .sort((a, b) => b.in - a.in || a.out - b.out || a.name.localeCompare(b.name));

    const topIn = standings.length ? standings[0].in : 0;
    const leaders = standings.filter(s => s.in === topIn && topIn > 0).map(s => s.name);

    let html = '<h2 class="section-title">Scoreboard</h2>';
    html += `
      <div class="summary-grid">
        <div class="stat lead"><div class="big">${leaders.length ? leaders.join(" & ") : "—"}</div><div class="label">Leading</div></div>
        <div class="stat"><div class="big">${totalIn}</div><div class="label">Teams still in</div></div>
        <div class="stat"><div class="big">${totalOut}</div><div class="label">Knocked out</div></div>
      </div>`;

    html += '<table><thead><tr><th>Player</th><th class="num">Still in</th><th class="num">Out</th><th>Surviving teams</th></tr></thead><tbody>';
    standings.forEach(s => {
      const knockedAll = s.in === 0;
      html += `<tr class="${knockedAll ? "knocked" : ""}">
        <td><strong>${s.name}</strong></td>
        <td class="num status-in">${s.in}</td>
        <td class="num status-out">${s.out}</td>
        <td>${s.inList.length ? s.inList.sort().join(", ") : "<em>all knocked out</em>"}</td>
      </tr>`;
    });
    html += '</tbody></table>';

    if (totalOut === 0) {
      html += '<p class="note">No teams knocked out yet. Set a team\'s <strong>status</strong> to <strong>"out"</strong> in data.js after it\'s eliminated and it\'ll show here.</p>';
    }
    el.innerHTML = html;
  }

  /* ---------- Knockout bracket ----------
     Built entirely from results.json (the hourly API feed). No data.js edits
     needed — match-ups, scores and who went through all come from the API. */
  function renderKnockout() {
    const el = $("knockout");
    const ko = DATA._knockout || [];
    let html = '<h2 class="section-title">Knockout bracket</h2>';

    if (!ko.length) {
      html += '<p class="note">The knockout bracket appears here automatically once the group stage ends and the fixtures land in the hourly feed (results.json). ' +
              'Opening this file straight from your computer can\'t fetch live data — view the published GitHub Pages link to see it.</p>';
      el.innerHTML = html;
      return;
    }

    // Champions banner once the final has a winner.
    const final = ko.find(k => k.stage === "FINAL" && k.played && k.winner);
    if (final) {
      const o = ownerOf(final.winner);
      html += `<div class="champion-banner">🏆 Champions: <strong>${final.winner}</strong>${o ? ` <span>(${o})</span>` : ""}</div>`;
    }

    html += '<p class="note">Updates automatically every hour. The team that goes through is highlighted; owners are shown beneath each team.</p>';

    const byStage = {};
    ko.forEach(k => { (byStage[k.stage] = byStage[k.stage] || []).push(k); });
    const orderOf = (s) => (STAGE_ORDER.indexOf(s) + 1) || 99;
    const stages = Object.keys(byStage).sort((a, b) => orderOf(a) - orderOf(b));

    const teamCell = (name, side, isWinner) => {
      const owner = name ? (ownerOf(name) || "—") : "";
      return `<div class="team ${side} ${isWinner ? "winner" : ""}">${name || "TBD"}` +
             `<div class="owner-tag">${owner}</div></div>`;
    };

    stages.forEach(st => {
      const label = STAGE_LABELS[st] || st;
      html += `<h3 class="day-heading">${label}</h3>`;
      byStage[st].forEach(k => {
        const hWin = k.played && k.winner && k.winner === k.home;
        const aWin = k.played && k.winner && k.winner === k.away;
        const mid = (k.played && k.score)
          ? `<span class="score">${k.score}</span>${k.pens ? `<div class="pens">pens ${k.pens}</div>` : ""}`
          : `<span class="ko">${k.date ? fmtDate(k.date) : "TBC"}</span>`;
        html += `
          <div class="card">
            <div class="fixture-meta">
              <span class="pill">${label}</span>
              <span>${k.played ? "Full time" : (k.date ? "Scheduled" : "To be confirmed")}</span>
            </div>
            <div class="fixture">
              ${teamCell(k.home, "home", hWin)}
              <div class="mid">${mid}</div>
              ${teamCell(k.away, "away", aWin)}
            </div>
          </div>`;
      });
    });
    el.innerHTML = html;
  }

  /* ---------- Live scores (results.json, written by the GitHub Action) ----------
     Merges auto-fetched scores onto the fixtures. Match order doesn't matter —
     if results.json lists a game the other way round, the score is flipped.
     If results.json is missing (e.g. opening the file locally), we silently
     fall back to whatever is in data.js. */
  async function mergeResults() {
    try {
      const res = await fetch("results.json?ts=" + Date.now(), { cache: "no-store" });
      if (!res.ok) return;
      const payload = await res.json();
      DATA._knockout = Array.isArray(payload.knockout) ? payload.knockout : [];
      const map = payload.results || {};
      DATA.fixtures.forEach(f => {
        let r = map[f.home + "|" + f.away], flip = false;
        if (!r) { r = map[f.away + "|" + f.home]; flip = true; }
        if (r && r.score) {
          let s = r.score;
          if (flip) { const p = s.split("-"); s = p[1] + "-" + p[0]; }
          f.score = s;
          f.played = true;
        }
      });
      if (payload.updated) DATA.meta.lastUpdated = payload.updated + " (auto)";
    } catch (e) { /* offline or local file:// — use data.js as-is */ }
  }

  async function boot() {
    await mergeResults();

    // Mark knockout losers as eliminated, so the scoreboard updates itself.
    koEliminated = new Set();
    (DATA._knockout || []).forEach(k => {
      if (k.played && k.winner) {
        if (k.home && k.home !== k.winner) koEliminated.add(k.home);
        if (k.away && k.away !== k.winner) koEliminated.add(k.away);
      }
    });

    $("last-updated").textContent = DATA.meta.lastUpdated;
    renderFixtures();
    renderStandings();
    renderKnockout();
    renderSelections();
    renderOdds();
    renderScoreboard();
  }
  boot();
})();
