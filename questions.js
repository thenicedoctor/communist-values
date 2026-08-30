// Axis metadata: each axis has a "left" pole and a "right" pole.
// Score is normalized to -100 (fully left pole) .. +100 (fully right pole).
const AXES = [
  {
    key: "econ",
    name: "Economic Policy",
    left: "Equality",
    right: "Free Market",
    leftDesc: "Favors collective ownership, redistribution, and strong regulation of markets to serve public need.",
    rightDesc: "Favors private enterprise, competition, and minimal state interference in markets.",
  },
  {
    key: "auth",
    name: "Authority",
    left: "Libertarian",
    right: "Authoritarian",
    leftDesc: "Favors individual liberty, decentralization, and limits on state power.",
    rightDesc: "Favors strong central authority, order, and deference to institutional power.",
  },
  {
    key: "social",
    name: "Social Values",
    left: "Progressive",
    right: "Conservative",
    leftDesc: "Favors evolving social norms and active reform of traditional structures.",
    rightDesc: "Favors preserving traditional norms, institutions, and family structures.",
  },
  {
    key: "bio",
    name: "Bioethics",
    left: "Transhumanist",
    right: "Bioconservative",
    leftDesc: "Favors embracing biotechnology and human enhancement.",
    rightDesc: "Favors caution and limits on altering human biology and nature.",
  },
  {
    key: "global",
    name: "Global Outlook",
    left: "Internationalist",
    right: "Nationalist",
    leftDesc: "Favors global cooperation, open borders, and shared sovereignty.",
    rightDesc: "Favors national sovereignty, borders, and prioritizing one's own nation.",
  },
  {
    key: "eco",
    name: "Ecology",
    left: "Environmentalist",
    right: "Productivist",
    leftDesc: "Favors prioritizing ecological protection, even at economic cost.",
    rightDesc: "Favors prioritizing growth and industry, trusting innovation over restriction.",
  },
  {
    key: "secular",
    name: "Religion & State",
    left: "Secular",
    right: "Religious",
    leftDesc: "Favors a strict separation of religion from law and public life.",
    rightDesc: "Favors religious and moral tradition shaping law and public life.",
  },
  {
    key: "peace",
    name: "Foreign Policy",
    left: "Pacifist",
    right: "Militarist",
    leftDesc: "Favors diplomacy, disarmament, and military restraint.",
    rightDesc: "Favors military strength, deterrence, and willingness to intervene.",
  },
];

// dir: -1 means agreeing pulls the score toward the LEFT pole; +1 toward the RIGHT pole.
const QUESTIONS = [
  // Economic (8)
  { axis: "econ", dir: -1, text: "The government should guarantee every citizen a job, a livable income, and free healthcare, even if it means higher taxes on the wealthy." },
  { axis: "econ", dir: 1, text: "Private businesses, not the state, are best suited to decide wages, prices, and working conditions." },
  { axis: "econ", dir: -1, text: "Major industries like energy, healthcare, and housing should be publicly owned or heavily regulated to serve the public good." },
  { axis: "econ", dir: 1, text: "Free trade and open markets, with minimal government interference, produce the most prosperity for everyone." },
  { axis: "econ", dir: -1, text: "Wealth inequality is a serious problem that requires strong redistribution through taxation and social programs." },
  { axis: "econ", dir: 1, text: "People who work harder or take more risks deserve to keep significantly more of what they earn." },
  { axis: "econ", dir: -1, text: "Labor unions and collective bargaining are essential to protect workers from exploitation." },
  { axis: "econ", dir: 1, text: "Excessive government spending on welfare discourages personal responsibility and initiative." },

  // Authority (8)
  { axis: "auth", dir: -1, text: "Individuals should be free to make choices about their own lives, even risky or unpopular ones, without government interference." },
  { axis: "auth", dir: 1, text: "A strong central authority is necessary to maintain order and protect society from chaos." },
  { axis: "auth", dir: -1, text: "Laws restricting personal behavior, like drug use or speech, do more harm than good." },
  { axis: "auth", dir: 1, text: "Sometimes civil liberties must be limited to ensure national security and public safety." },
  { axis: "auth", dir: -1, text: "Police and state surveillance powers should be tightly limited to prevent abuse." },
  { axis: "auth", dir: 1, text: "Obedience to authority and respect for law and order are essential values for a functioning society." },
  { axis: "auth", dir: -1, text: "Direct democracy and decentralization of power lead to better outcomes than top-down control." },
  { axis: "auth", dir: 1, text: "Strong leadership that can act decisively, even bypassing lengthy deliberation, is sometimes necessary for a country to succeed." },

  // Social Values (8)
  { axis: "social", dir: -1, text: "Society should continually evolve its norms around gender, family, and relationships to be more inclusive." },
  { axis: "social", dir: 1, text: "Traditional family structures and long-standing social norms provide important stability and should be preserved." },
  { axis: "social", dir: -1, text: "Discrimination based on gender identity or sexual orientation should be actively fought through law and policy." },
  { axis: "social", dir: 1, text: "Rapid social change undermines cultural cohesion and should be approached with caution." },
  { axis: "social", dir: -1, text: "Comprehensive sex education and open discussion of gender diversity should be standard in schools." },
  { axis: "social", dir: 1, text: "Institutions like marriage and religion play a vital role that should not be radically redefined." },
  { axis: "social", dir: -1, text: "Affirmative action and similar policies are necessary to correct historical inequalities." },
  { axis: "social", dir: 1, text: "Merit, not group identity, should be the basis for opportunity and advancement." },

  // Bioethics (7)
  { axis: "bio", dir: -1, text: "Humans should embrace genetic engineering and biotechnology to enhance intelligence, health, and lifespan." },
  { axis: "bio", dir: 1, text: "Tampering with human nature through technology, like gene editing or cybernetics, is dangerous and should be strictly limited." },
  { axis: "bio", dir: -1, text: "Artificial intelligence and biotechnology should be pursued aggressively to solve humanity's biggest problems, even radical ones like ending aging." },
  { axis: "bio", dir: 1, text: "There are aspects of being human that should remain untouched by technological modification, regardless of potential benefits." },
  { axis: "bio", dir: -1, text: "Society should support research into radical life extension and cognitive enhancement." },
  { axis: "bio", dir: 1, text: "Playing with life, death, and human biology raises serious ethical dangers that outweigh potential benefits." },
  { axis: "bio", dir: -1, text: "Access to human enhancement technology should eventually be normalized, not just used to treat illness." },

  // Global Outlook (7)
  { axis: "global", dir: -1, text: "Nations should cooperate closely and cede some sovereignty to international bodies to solve global problems like climate change." },
  { axis: "global", dir: 1, text: "National sovereignty and self-determination should take priority over international agreements." },
  { axis: "global", dir: -1, text: "Open borders and freer global migration benefit both migrants and host countries." },
  { axis: "global", dir: 1, text: "A country's first duty is to protect and prioritize the interests of its own citizens over global concerns." },
  { axis: "global", dir: -1, text: "Global institutions like the UN or WHO should have more authority to enforce standards across countries." },
  { axis: "global", dir: 1, text: "National culture and identity should be protected from excessive foreign or global influence." },
  { axis: "global", dir: -1, text: "Humanity's shared challenges matter more than national borders and citizenship distinctions." },

  // Ecology (7)
  { axis: "eco", dir: -1, text: "Environmental protection should take priority over economic growth, even if it slows industrial development." },
  { axis: "eco", dir: 1, text: "Economic growth and job creation should not be sacrificed for environmental regulations." },
  { axis: "eco", dir: -1, text: "Governments should aggressively phase out fossil fuels, even at significant short-term economic cost." },
  { axis: "eco", dir: 1, text: "Technological innovation, not restrictions on industry, is the best way to address environmental problems." },
  { axis: "eco", dir: -1, text: "Protecting ecosystems and biodiversity should limit how land and resources can be developed." },
  { axis: "eco", dir: 1, text: "Industrial and agricultural expansion is necessary to meet human needs, even if it impacts the environment." },
  { axis: "eco", dir: -1, text: "Individuals and corporations should be heavily taxed or regulated for their carbon footprint." },

  // Religion & State (7)
  { axis: "secular", dir: -1, text: "Religion should have no influence on government policy or law." },
  { axis: "secular", dir: 1, text: "Religious and moral traditions should guide a nation's laws and values." },
  { axis: "secular", dir: -1, text: "Public institutions like schools should be entirely free of religious practice or symbolism." },
  { axis: "secular", dir: 1, text: "Faith and religious community play an important, positive role in society that policy should support." },
  { axis: "secular", dir: -1, text: "Scientific consensus should take precedence over religious belief in shaping public policy." },
  { axis: "secular", dir: 1, text: "Moral guidance is best rooted in longstanding religious or spiritual tradition rather than shifting secular values." },
  { axis: "secular", dir: -1, text: "Personal religious belief should stay a private matter, separate from public and political life." },

  // Foreign Policy (8)
  { axis: "peace", dir: -1, text: "Military spending should be reduced in favor of diplomacy, aid, and domestic investment." },
  { axis: "peace", dir: 1, text: "A strong, well-funded military is essential to defend national interests and deter adversaries." },
  { axis: "peace", dir: -1, text: "War should always be a last resort, pursued only when all diplomatic options have failed." },
  { axis: "peace", dir: 1, text: "Sometimes military intervention is necessary and justified to protect national or allied interests." },
  { axis: "peace", dir: -1, text: "Arms sales and weapons proliferation cause more harm than security and should be curtailed." },
  { axis: "peace", dir: 1, text: "Projecting military strength abroad helps maintain global stability and national security." },
  { axis: "peace", dir: -1, text: "Conscientious objection and anti-war movements represent important, valid moral positions." },
  { axis: "peace", dir: 1, text: "National security should take precedence over concerns about civil liberties during conflicts." },
];
