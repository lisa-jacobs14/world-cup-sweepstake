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
        const out = t.status === "out";
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
      const out = t.status === "out";
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

  /* ---------- Scoreboard ---------- */
  function renderScoreboard() {
    const el = $("scoreboard");
    const people = {};
    teams.forEach(t => {
      const p = people[t.owner] = people[t.owner] || { in: [], out: [] };
      (t.status === "out" ? p.out : p.in).push(t.name);
    });

    const totalOut = teams.filter(t => t.status === "out").length;
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

  renderFixtures();
  renderSelections();
  renderOdds();
  renderScoreboard();
})();
