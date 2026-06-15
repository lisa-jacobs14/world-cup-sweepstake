/* ============================================================
   WORLD CUP 2026 FAMILY SWEEPSTAKE — DATA FILE
   ------------------------------------------------------------
   This is the ONLY file you need to edit during the tournament.
   No coding knowledge required — just change the text between
   the quote marks. Save the file and refresh the page.

   THREE THINGS YOU'LL UPDATE AS THE WORLD CUP GOES ON:
     1. odds:   update a team's betting odds  (e.g. "5/1")
     2. status: "in"  = still in the tournament
                "out" = knocked out  ->  shows on the scoreboard
     3. fixtures: add results (score + played: true) and new games

   Tip: keep a backup copy of this file before big edits.
   ============================================================ */

window.SWEEPSTAKE = {

  /* ---- Tournament info shown in the header ---- */
  meta: {
    title: "Family World Cup 2026 Sweepstake",
    subtitle: "USA · Canada · Mexico · 11 June – 19 July 2026",
    lastUpdated: "11 June 2026"   // change this whenever you update the page
  },

  /* ============================================================
     TEAMS
     ------------------------------------------------------------
     owner  = who drew the team
     group  = official group letter (A–L)
     odds   = outright tournament-winner odds (EDIT as you go)
     status = "in" or "out"  (set to "out" when knocked out)
     ============================================================ */
  teams: [
    // Group A
    { name: "Mexico",          group: "A", owner: "J",       odds: "50/1",  status: "in" },
    { name: "South Africa",    group: "A", owner: "Georgie", odds: "250/1", status: "in" },
    { name: "Korea Republic",  group: "A", owner: "Jake",    odds: "100/1", status: "in" },
    { name: "Czechia",         group: "A", owner: "Grannie", odds: "150/1", status: "in" },

    // Group B
    { name: "Canada",          group: "B", owner: "Rosa",    odds: "100/1", status: "in" },
    { name: "Switzerland",     group: "B", owner: "Will",    odds: "66/1",  status: "in" },
    { name: "Qatar",           group: "B", owner: "Georgie", odds: "250/1", status: "in" },
    { name: "Bosnia & Herzegovina", group: "B", owner: "Grandad", odds: "200/1", status: "in" },

    // Group C
    { name: "Brazil",          group: "C", owner: "Georgie", odds: "8/1",   status: "in" },
    { name: "Morocco",         group: "C", owner: "Jake",    odds: "40/1",  status: "in" },
    { name: "Haiti",           group: "C", owner: "Finn",    odds: "750/1", status: "in" },
    { name: "Scotland",        group: "C", owner: "Will",    odds: "150/1", status: "in" },

    // Group D
    { name: "United States",   group: "D", owner: "Rosa",    odds: "40/1",  status: "in" },
    { name: "Paraguay",        group: "D", owner: "Max",     odds: "150/1", status: "in" },
    { name: "Australia",       group: "D", owner: "Grandad", odds: "150/1", status: "in" },
    { name: "Türkiye",         group: "D", owner: "Sam",     odds: "66/1",  status: "in" },

    // Group E
    { name: "Germany",         group: "E", owner: "Charlie", odds: "9/1",   status: "in" },
    { name: "Curaçao",         group: "E", owner: "Isobel",  odds: "1000/1",status: "in" },
    { name: "Côte d'Ivoire",   group: "E", owner: "Lisa",    odds: "80/1",  status: "in" },
    { name: "Ecuador",         group: "E", owner: "Gaz",     odds: "66/1",  status: "in" },

    // Group F
    { name: "Netherlands",     group: "F", owner: "Zac",     odds: "14/1",  status: "in" },
    { name: "Japan",           group: "F", owner: "Finn",    odds: "50/1",  status: "in" },
    { name: "Tunisia",         group: "F", owner: "Charlie", odds: "200/1", status: "in" },
    { name: "Sweden",          group: "F", owner: "Evelyn",  odds: "100/1", status: "in" },

    // Group G
    { name: "Belgium",         group: "G", owner: "Grandad", odds: "22/1",  status: "in" },
    { name: "Egypt",           group: "G", owner: "Tanya",   odds: "80/1",  status: "in" },
    { name: "Iran",            group: "G", owner: "Lisa",    odds: "200/1", status: "in" },
    { name: "New Zealand",     group: "G", owner: "Rosa",    odds: "500/1", status: "in" },

    // Group H
    { name: "Spain",           group: "H", owner: "Tony",    odds: "9/2",   status: "in" },
    { name: "Cabo Verde",      group: "H", owner: "Jake",    odds: "750/1", status: "in" },
    { name: "Saudi Arabia",    group: "H", owner: "Will",    odds: "250/1", status: "in" },
    { name: "Uruguay",         group: "H", owner: "Max",     odds: "28/1",  status: "in" },

    // Group I
    { name: "France",          group: "I", owner: "Evelyn",  odds: "5/1",   status: "in" },
    { name: "Senegal",         group: "I", owner: "Bindy",   odds: "50/1",  status: "in" },
    { name: "Norway",          group: "I", owner: "Isobel",  odds: "66/1",  status: "in" },
    { name: "Iraq",            group: "I", owner: "Charlie", odds: "500/1", status: "in" },

    // Group J
    { name: "Argentina",       group: "J", owner: "Gaz",     odds: "11/2",  status: "in" },
    { name: "Algeria",         group: "J", owner: "Bindy",   odds: "150/1", status: "in" },
    { name: "Austria",         group: "J", owner: "Zac",     odds: "80/1",  status: "in" },
    { name: "Jordan",          group: "J", owner: "Evelyn",  odds: "500/1", status: "in" },

    // Group K
    { name: "Portugal",        group: "K", owner: "Isobel",  odds: "8/1",   status: "in" },
    { name: "Uzbekistan",      group: "K", owner: "Finn",    odds: "500/1", status: "in" },
    { name: "Colombia",        group: "K", owner: "Grannie", odds: "40/1",  status: "in" },
    { name: "DR Congo",        group: "K", owner: "J",       odds: "300/1", status: "in" },

    // Group L
    { name: "England",         group: "L", owner: "Tanya",   odds: "11/2",  status: "in" },
    { name: "Croatia",         group: "L", owner: "Sam",     odds: "40/1",  status: "in" },
    { name: "Ghana",           group: "L", owner: "Zac",     odds: "150/1", status: "in" },
    { name: "Panama",          group: "L", owner: "Tony",    odds: "250/1", status: "in" }
  ],

  /* ============================================================
     BONUS / VOID PICKS
     Teams drawn that are NOT in the 2026 World Cup.
     Shown against the owner's name but excluded from the
     scoreboard. (Jamaica did not qualify.)
     ============================================================ */
  voidPicks: [
    { name: "Jamaica", owner: "Evelyn", note: "Did not qualify for WC 2026" }
  ],

  /* ============================================================
     FIXTURES
     ------------------------------------------------------------
     date    = "YYYY-MM-DD"
     ukTime  = UK kick-off time (BST) as text, e.g. "20:00"
     played  = false until the match is done; set to true after
     score   = e.g. "2-1" once played (leave "" if not played)
     Add more rows as kick-off times are confirmed. Keep them in
     date order or the page will sort them for you.
     ============================================================ */
  fixtures: [
    // Matchday 1
    { date: "2026-06-11", ukTime: "20:00", group: "A", home: "Mexico",         away: "South Africa",        played: true, score: "2-0" },
    { date: "2026-06-12", ukTime: "20:00", group: "B", home: "Canada",         away: "Bosnia & Herzegovina",played: true, score: "1-1" },
    { date: "2026-06-12", ukTime: "02:00", group: "D", home: "United States",  away: "Paraguay",            played: true, score: "4-1" },
    { date: "2026-06-13", ukTime: "20:00", group: "B", home: "Qatar",          away: "Switzerland",         played: true, score: "1-1" },
    { date: "2026-06-14", ukTime: "18:00", group: "E", home: "Germany",        away: "Curaçao",             played: true, score: "7-1" },
    { date: "2026-06-14", ukTime: "21:00", group: "F", home: "Netherlands",    away: "Japan",               played: true, score: "2-2" },
    { date: "2026-06-15", ukTime: "00:00", group: "E", home: "Côte d'Ivoire",  away: "Ecuador",             played: true, score: "1-0" },
    { date: "2026-06-15", ukTime: "03:00", group: "F", home: "Sweden",         away: "Tunisia",             played: true, score: "5-1" },
    { date: "2026-06-15", ukTime: "18:00", group: "H", home: "Spain",          away: "Cabo Verde",          played: false, score: "" },
    { date: "2026-06-15", ukTime: "23:00", group: "G", home: "Belgium",        away: "Egypt",               played: false, score: "" },
    { date: "2026-06-15", ukTime: "23:00", group: "H", home: "Saudi Arabia",   away: "Uruguay",             played: false, score: "" },
    { date: "2026-06-16", ukTime: "02:00", group: "G", home: "Iran",           away: "New Zealand",         played: false, score: "" },
    { date: "2026-06-16", ukTime: "20:00", group: "I", home: "France",         away: "Senegal",             played: false, score: "" },
    { date: "2026-06-16", ukTime: "23:00", group: "I", home: "Iraq",           away: "Norway",              played: false, score: "" },
    { date: "2026-06-17", ukTime: "01:00", group: "J", home: "Argentina",      away: "Algeria",             played: false, score: "" },
    { date: "2026-06-17", ukTime: "02:00", group: "J", home: "Austria",        away: "Jordan",              played: false, score: "" },
    { date: "2026-06-17", ukTime: "18:00", group: "K", home: "Portugal",       away: "DR Congo",            played: false, score: "" },
    { date: "2026-06-17", ukTime: "21:00", group: "L", home: "England",        away: "Croatia",             played: false, score: "" },
    { date: "2026-06-18", ukTime: "00:00", group: "L", home: "Ghana",          away: "Panama",              played: false, score: "" },
    { date: "2026-06-18", ukTime: "03:00", group: "K", home: "Uzbekistan",     away: "Colombia",            played: false, score: "" },

    // Matchday 2
    { date: "2026-06-18", ukTime: "17:00", group: "A", home: "Czechia",        away: "South Africa",        played: false, score: "" },
    { date: "2026-06-18", ukTime: "20:00", group: "B", home: "Switzerland",    away: "Bosnia & Herzegovina",played: false, score: "" },
    { date: "2026-06-18", ukTime: "23:00", group: "B", home: "Canada",         away: "Qatar",               played: false, score: "" },
    { date: "2026-06-19", ukTime: "04:00", group: "A", home: "Mexico",         away: "Korea Republic",      played: false, score: "" },
    { date: "2026-06-19", ukTime: "20:00", group: "D", home: "United States",  away: "Australia",           played: false, score: "" },
    { date: "2026-06-19", ukTime: "23:00", group: "C", home: "Scotland",       away: "Morocco",             played: false, score: "" },
    { date: "2026-06-20", ukTime: "02:00", group: "C", home: "Brazil",         away: "Haiti",               played: false, score: "" },
    { date: "2026-06-20", ukTime: "02:00", group: "D", home: "Türkiye",        away: "Paraguay",            played: false, score: "" },

    // Matchday 2 (cont.)
    { date: "2026-06-23", ukTime: "21:00", group: "L", home: "England",        away: "Ghana",               played: false, score: "" },

    // Matchday 3 — final round. Two games per group kick off together.
    // (US kick-off times converted to UK time / BST. Early-hours games carry the next day's date.)
    { date: "2026-06-24", ukTime: "20:00", group: "B", home: "Switzerland",    away: "Canada",              played: false, score: "" },
    { date: "2026-06-24", ukTime: "20:00", group: "B", home: "Bosnia & Herzegovina", away: "Qatar",         played: false, score: "" },
    { date: "2026-06-24", ukTime: "23:00", group: "C", home: "Scotland",       away: "Brazil",              played: false, score: "" },
    { date: "2026-06-24", ukTime: "23:00", group: "C", home: "Morocco",        away: "Haiti",               played: false, score: "" },
    { date: "2026-06-25", ukTime: "02:00", group: "A", home: "Czechia",        away: "Mexico",              played: false, score: "" },
    { date: "2026-06-25", ukTime: "02:00", group: "A", home: "South Africa",   away: "Korea Republic",      played: false, score: "" },
    { date: "2026-06-25", ukTime: "21:00", group: "E", home: "Ecuador",        away: "Germany",             played: false, score: "" },
    { date: "2026-06-25", ukTime: "21:00", group: "E", home: "Curaçao",        away: "Côte d'Ivoire",       played: false, score: "" },
    { date: "2026-06-26", ukTime: "00:00", group: "F", home: "Japan",          away: "Sweden",              played: false, score: "" },
    { date: "2026-06-26", ukTime: "00:00", group: "F", home: "Tunisia",        away: "Netherlands",         played: false, score: "" },
    { date: "2026-06-26", ukTime: "03:00", group: "D", home: "Türkiye",        away: "United States",       played: false, score: "" },
    { date: "2026-06-26", ukTime: "03:00", group: "D", home: "Paraguay",       away: "Australia",           played: false, score: "" },
    { date: "2026-06-26", ukTime: "20:00", group: "I", home: "Norway",         away: "France",              played: false, score: "" },
    { date: "2026-06-26", ukTime: "20:00", group: "I", home: "Senegal",        away: "Iraq",                played: false, score: "" },
    { date: "2026-06-27", ukTime: "01:00", group: "H", home: "Cabo Verde",     away: "Saudi Arabia",        played: false, score: "" },
    { date: "2026-06-27", ukTime: "01:00", group: "H", home: "Uruguay",        away: "Spain",               played: false, score: "" },
    { date: "2026-06-27", ukTime: "04:00", group: "G", home: "Egypt",          away: "Iran",                played: false, score: "" },
    { date: "2026-06-27", ukTime: "04:00", group: "G", home: "New Zealand",    away: "Belgium",             played: false, score: "" },
    { date: "2026-06-27", ukTime: "22:00", group: "L", home: "Panama",         away: "England",             played: false, score: "" },
    { date: "2026-06-27", ukTime: "22:00", group: "L", home: "Croatia",        away: "Ghana",               played: false, score: "" },
    { date: "2026-06-28", ukTime: "00:30", group: "K", home: "DR Congo",       away: "Uzbekistan",          played: false, score: "" },
    { date: "2026-06-28", ukTime: "00:30", group: "K", home: "Colombia",       away: "Portugal",            played: false, score: "" },
    { date: "2026-06-28", ukTime: "03:00", group: "J", home: "Jordan",         away: "Argentina",           played: false, score: "" },
    { date: "2026-06-28", ukTime: "03:00", group: "J", home: "Algeria",        away: "Austria",             played: false, score: "" },

    // Remaining group games — correct match-ups, but UK kick-off times still
    // to confirm (shown as "TBC"). Dates are best estimates; tweak as FIFA confirms.
    { date: "2026-06-12", ukTime: "TBC",   group: "A", home: "Korea Republic", away: "Czechia",             played: true, score: "2-1"},
    { date: "2026-06-13", ukTime: "TBC",   group: "D", home: "Australia",      away: "Türkiye",             played: true, score: "2-0" },
    { date: "2026-06-20", ukTime: "TBC",   group: "E", home: "Germany",        away: "Côte d'Ivoire",       played: false, score: "" },
    { date: "2026-06-20", ukTime: "TBC",   group: "E", home: "Curaçao",        away: "Ecuador",             played: false, score: "" },
    { date: "2026-06-21", ukTime: "TBC",   group: "F", home: "Netherlands",    away: "Sweden",              played: false, score: "" },
    { date: "2026-06-21", ukTime: "TBC",   group: "F", home: "Japan",          away: "Tunisia",             played: false, score: "" },
    { date: "2026-06-21", ukTime: "TBC",   group: "G", home: "Belgium",        away: "Iran",                played: false, score: "" },
    { date: "2026-06-21", ukTime: "TBC",   group: "G", home: "Egypt",          away: "New Zealand",         played: false, score: "" },
    { date: "2026-06-21", ukTime: "TBC",   group: "H", home: "Spain",          away: "Saudi Arabia",        played: false, score: "" },
    { date: "2026-06-21", ukTime: "TBC",   group: "H", home: "Cabo Verde",     away: "Uruguay",             played: false, score: "" },
    { date: "2026-06-22", ukTime: "TBC",   group: "I", home: "France",         away: "Iraq",                played: false, score: "" },
    { date: "2026-06-22", ukTime: "TBC",   group: "I", home: "Senegal",        away: "Norway",              played: false, score: "" },
    { date: "2026-06-22", ukTime: "TBC",   group: "J", home: "Argentina",      away: "Austria",             played: false, score: "" },
    { date: "2026-06-22", ukTime: "TBC",   group: "J", home: "Algeria",        away: "Jordan",              played: false, score: "" },
    { date: "2026-06-23", ukTime: "TBC",   group: "C", home: "Brazil",         away: "Morocco",             played: true, score: "1-1" },
      { date: "2026-06-23", ukTime: "TBC",   group: "C", home: "Scotland",       away: "Haiti",               played: true, score: "1-0" },
    { date: "2026-06-23", ukTime: "TBC",   group: "K", home: "Portugal",       away: "Uzbekistan",          played: false, score: "" },
    { date: "2026-06-23", ukTime: "TBC",   group: "K", home: "Colombia",       away: "DR Congo",            played: false, score: "" },
    { date: "2026-06-23", ukTime: "TBC",   group: "L", home: "Croatia",        away: "Panama",              played: false, score: "" }
  ]
};
