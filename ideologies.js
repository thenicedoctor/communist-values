// Reference points for naming a "closest tendency" on the results screen.
// Vectors use the same -100..100 scale as the axis scores (econ/auth/global/peace),
// econ negative = equality/planned economy, auth negative = libertarian/anti-party,
// global negative = internationalist, peace negative = anti-militarist.
const AXIS_WEIGHTS = { econ: 1.5, auth: 1.3, global: 1.0, peace: 0.8 };

const IDEOLOGIES = [
  {
    name: "Marxism–Leninism",
    vector: { econ: -85, auth: 25, global: -55, peace: 10 },
    blurb: "Centrally planned economy led by a disciplined vanguard party organized through democratic centralism, aiming to build socialism as a transitional stage toward communism.",
    wiki: "https://en.wikipedia.org/wiki/Marxism%E2%80%93Leninism",
  },
  {
    name: "Stalinism",
    vector: { econ: -80, auth: 60, global: 15, peace: 20 },
    blurb: "State-directed industrialization and a highly centralized party-state, prioritizing “socialism in one country” and strict internal discipline over global revolutionary coordination.",
    wiki: "https://en.wikipedia.org/wiki/Stalinism",
  },
  {
    name: "Trotskyism",
    vector: { econ: -85, auth: 0, global: -80, peace: 0 },
    blurb: "Permanent, internationally coordinated revolution and workers' democracy within a planned economy, opposed to bureaucratic entrenchment within a single state.",
    wiki: "https://en.wikipedia.org/wiki/Trotskyism",
  },
  {
    name: "Maoism",
    vector: { econ: -80, auth: 35, global: -40, peace: 35 },
    blurb: "Peasant-based protracted people's war, continuous revolution against bureaucratic backsliding, and self-reliant agrarian development.",
    wiki: "https://en.wikipedia.org/wiki/Maoism",
  },
  {
    name: "Guevarism / Foquism",
    vector: { econ: -80, auth: 20, global: -50, peace: 45 },
    blurb: "Small, mobile revolutionary vanguards (focos) igniting armed insurrection, paired with internationalist solidarity among liberation movements.",
    wiki: "https://en.wikipedia.org/wiki/Guevarism",
  },
  {
    name: "Juche",
    vector: { econ: -70, auth: 80, global: 45, peace: 15 },
    blurb: "Self-reliant national development under a single centralized leadership, prioritizing sovereignty and independence from foreign influence over internationalism.",
    wiki: "https://en.wikipedia.org/wiki/Juche",
  },
  {
    name: "Council Communism",
    vector: { econ: -85, auth: -70, global: -70, peace: -10 },
    blurb: "Direct workers' self-management through elected councils, rejecting vanguard parties and parliamentary politics in favor of grassroots working-class democracy.",
    wiki: "https://en.wikipedia.org/wiki/Council_communism",
  },
  {
    name: "Anarcho-Communism",
    vector: { econ: -90, auth: -95, global: -75, peace: -30 },
    blurb: "Immediate abolition of the state and all hierarchy alongside private property, organizing production and distribution through voluntary, federated communes.",
    wiki: "https://en.wikipedia.org/wiki/Anarcho-communism",
  },
  {
    name: "Luxemburgism",
    vector: { econ: -85, auth: -50, global: -75, peace: -15 },
    blurb: "Mass strikes and spontaneous working-class organization as the engine of revolution, wary of both rigid party bureaucracy and reformist compromise.",
    wiki: "https://en.wikipedia.org/wiki/Luxemburgism",
  },
  {
    name: "Titoism / Market Socialism",
    vector: { econ: -45, auth: -10, global: -10, peace: -10 },
    blurb: "Worker-managed enterprises operating within a market framework, combined with non-alignment and independence from larger communist blocs.",
    wiki: "https://en.wikipedia.org/wiki/Titoism",
  },
  {
    name: "Eurocommunism",
    vector: { econ: -50, auth: -45, global: -15, peace: -45 },
    blurb: "Pursuing socialism through parliamentary democracy and pluralism, breaking with revolutionary vanguardism in favor of electoral and civil-society strategy.",
    wiki: "https://en.wikipedia.org/wiki/Eurocommunism",
  },
  {
    name: "Democratic Socialism",
    vector: { econ: -55, auth: -40, global: -20, peace: -40 },
    blurb: "Gradual, democratic transformation toward public ownership and strong welfare provision, working within existing electoral institutions rather than revolution.",
    wiki: "https://en.wikipedia.org/wiki/Democratic_socialism",
  },
  {
    name: "National Bolshevism",
    vector: { econ: -70, auth: 55, global: 55, peace: 35 },
    blurb: "A syncretic fusion of revolutionary nationalism and anti-capitalist economics, uniting radical nationalists and communists against liberal capitalism and Western hegemony.",
    wiki: "https://en.wikipedia.org/wiki/National_Bolshevism",
  },
  {
    name: "Hoxhaism",
    vector: { econ: -85, auth: 70, global: 30, peace: 20 },
    blurb: "Uncompromising anti-revisionist Marxism–Leninism that rejects both Soviet and Maoist deviations, pursuing rigid party orthodoxy and national self-isolation to preserve ideological purity.",
    wiki: "https://en.wikipedia.org/wiki/Hoxhaism",
  },
  {
    name: "Bordigism",
    vector: { econ: -90, auth: -15, global: -70, peace: -15 },
    blurb: "Rigidly orthodox left communism that rejects parliamentary participation, trade unionism, and popular fronts, insisting on an unwavering international communist party as the sole vehicle of revolution.",
    wiki: "https://en.wikipedia.org/wiki/Amadeo_Bordiga",
  },
  {
    name: "Dengism",
    vector: { econ: -20, auth: 55, global: 10, peace: -5 },
    blurb: "Market-oriented economic reform under continued one-party rule, prioritizing pragmatic development and global economic integration over revolutionary orthodoxy.",
    wiki: "https://en.wikipedia.org/wiki/Deng_Xiaoping_Theory",
  },
  {
    name: "Maoism–Third Worldism",
    vector: { econ: -75, auth: 30, global: -55, peace: 40 },
    blurb: "Reframes the global class struggle as a conflict between an imperialist Global North and an exploited Global South, viewing Third World peasantries rather than First World workers as the revolutionary vanguard.",
    wiki: "https://en.wikipedia.org/wiki/Maoism%E2%80%93Third_Worldism",
  },
  {
    name: "Anarcho-Syndicalism",
    vector: { econ: -85, auth: -85, global: -55, peace: -20 },
    blurb: "Organizes workers into revolutionary trade unions that seize direct control of production through general strikes and direct action, replacing both the state and capitalism with federated worker self-management.",
    wiki: "https://en.wikipedia.org/wiki/Anarcho-syndicalism",
  },
  {
    name: "Autonomism",
    vector: { econ: -75, auth: -60, global: -50, peace: -30 },
    blurb: "Centers spontaneous, self-organized working-class struggle outside official unions and parties, viewing autonomous grassroots refusal of work as the engine of revolutionary change.",
    wiki: "https://en.wikipedia.org/wiki/Autonomism",
  },
  {
    name: "Christian Communism",
    vector: { econ: -65, auth: -20, global: -30, peace: -35 },
    blurb: "Applies Christian ethical teachings on communal ownership and solidarity with the poor to justify communist economic organization and active resistance to oppressive structures.",
    wiki: "https://en.wikipedia.org/wiki/Christian_communism",
  },
];

function closestIdeologies(scores, count = 3) {
  const maxDistSq = Object.values(AXIS_WEIGHTS).reduce((sum, w) => sum + w * 200 * 200, 0);

  const ranked = IDEOLOGIES.map((ideology) => {
    let distSq = 0;
    for (const axis in AXIS_WEIGHTS) {
      const diff = scores[axis] - ideology.vector[axis];
      distSq += AXIS_WEIGHTS[axis] * diff * diff;
    }
    const match = Math.max(0, Math.round((1 - Math.sqrt(distSq / maxDistSq)) * 100));
    return { ...ideology, match };
  });

  ranked.sort((a, b) => b.match - a.match);
  return ranked.slice(0, count);
}
