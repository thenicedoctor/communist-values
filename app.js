const LIKERT = [
  { value: -2, label: "Strongly Disagree" },
  { value: -1, label: "Disagree" },
  { value: 0, label: "Neutral" },
  { value: 1, label: "Agree" },
  { value: 2, label: "Strongly Agree" },
];

let order = [];
let answers = {};
let current = 0;

const introEl = document.getElementById("intro");
const quizEl = document.getElementById("quiz");
const resultsEl = document.getElementById("results");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const questionText = document.getElementById("question-text");
const likertGroup = document.getElementById("likert-group");
const axisLabel = document.getElementById("axis-label");

function shuffledOrder() {
  const idx = QUESTIONS.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

function startQuiz() {
  order = shuffledOrder();
  answers = {};
  current = 0;
  introEl.hidden = true;
  resultsEl.hidden = true;
  quizEl.hidden = false;
  renderQuestion();
}

function renderQuestion() {
  const qIndex = order[current];
  const q = QUESTIONS[qIndex];
  const axis = AXES.find((a) => a.key === q.axis);

  axisLabel.textContent = axis.name;
  questionText.textContent = q.text;

  likertGroup.innerHTML = "";
  LIKERT.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "likert-btn";
    btn.textContent = opt.label;
    if (answers[qIndex] === opt.value) btn.classList.add("selected");
    btn.addEventListener("click", () => {
      answers[qIndex] = opt.value;
      renderQuestion();
      setTimeout(() => {
        if (current < order.length - 1) {
          current++;
          renderQuestion();
        } else {
          finishQuiz();
        }
      }, 150);
    });
    likertGroup.appendChild(btn);
  });

  const pct = Math.round((current / order.length) * 100);
  progressFill.style.width = pct + "%";
  progressText.textContent = `Question ${current + 1} of ${order.length}`;

  prevBtn.disabled = current === 0;
  nextBtn.textContent = current === order.length - 1 ? "Finish" : "Skip";
}

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (current < order.length - 1) {
    current++;
    renderQuestion();
  } else {
    finishQuiz();
  }
});

function computeScores() {
  const sums = {};
  const counts = {};
  AXES.forEach((a) => {
    sums[a.key] = 0;
    counts[a.key] = 0;
  });

  QUESTIONS.forEach((q, i) => {
    const val = answers[i];
    if (val === undefined) return;
    sums[q.axis] += q.dir * val;
    counts[q.axis] += 1;
  });

  const scores = {};
  AXES.forEach((a) => {
    const maxPossible = counts[a.key] * 2;
    scores[a.key] = maxPossible > 0 ? Math.round((sums[a.key] / maxPossible) * 100) : 0;
  });
  return scores;
}

function magnitudeLabel(score) {
  const abs = Math.abs(score);
  if (abs < 15) return "Balanced";
  if (abs < 40) return "Slight";
  if (abs < 70) return "Moderate";
  return "Strong";
}

function finishQuiz() {
  const scores = computeScores();
  quizEl.hidden = true;
  resultsEl.hidden = false;
  renderResults(scores);
}

function renderResults(scores) {
  renderIdeologyMatches(scores);

  const barsEl = document.getElementById("axis-bars");
  barsEl.innerHTML = "";

  AXES.forEach((axis) => {
    const score = scores[axis.key];
    const mag = magnitudeLabel(score);
    const pole = score === 0 ? "Centered" : score < 0 ? axis.left : axis.right;

    const row = document.createElement("div");
    row.className = "axis-row";

    const header = document.createElement("div");
    header.className = "axis-row-header";
    header.innerHTML = `<span>${axis.name}</span><span class="axis-result-label">${mag} ${pole}</span>`;

    const track = document.createElement("div");
    track.className = "axis-track";

    const leftTag = document.createElement("span");
    leftTag.className = "axis-tag axis-tag-left";
    leftTag.textContent = axis.left;

    const rightTag = document.createElement("span");
    rightTag.className = "axis-tag axis-tag-right";
    rightTag.textContent = axis.right;

    const bar = document.createElement("div");
    bar.className = "axis-bar";
    const marker = document.createElement("div");
    marker.className = "axis-marker";
    const pos = ((score + 100) / 200) * 100;
    marker.style.left = `calc(${pos}% - 6px)`;
    bar.appendChild(marker);

    const barWrap = document.createElement("div");
    barWrap.className = "axis-track-inner";
    barWrap.appendChild(leftTag);
    barWrap.appendChild(bar);
    barWrap.appendChild(rightTag);

    track.appendChild(barWrap);

    row.appendChild(header);
    row.appendChild(track);
    barsEl.appendChild(row);
  });

  drawRadar(scores);
}

function renderIdeologyMatches(scores) {
  const el = document.getElementById("ideology-match");
  el.innerHTML = "";

  const top = closestIdeologies(scores, 3);
  const [best, ...rest] = top;

  const primary = document.createElement("div");
  primary.className = "ideology-primary";
  primary.innerHTML = `
    <div class="ideology-eyebrow">Closest tendency</div>
    <div class="ideology-name">${best.name}</div>
    <div class="ideology-match-pct">${best.match}% match</div>
    <p class="ideology-blurb">${best.blurb}</p>
    <a class="ideology-wiki" href="${best.wiki}" target="_blank" rel="noopener">Read more on Wikipedia &rarr;</a>
  `;
  el.appendChild(primary);

  if (rest.length) {
    const list = document.createElement("div");
    list.className = "ideology-runners";
    rest.forEach((ideology) => {
      const row = document.createElement("div");
      row.className = "ideology-runner-row";
      row.innerHTML = `<span><a href="${ideology.wiki}" target="_blank" rel="noopener">${ideology.name}</a></span><span class="ideology-runner-pct">${ideology.match}%</span>`;
      list.appendChild(row);
    });
    el.appendChild(list);
  }
}

function drawRadar(scores) {
  const canvas = document.getElementById("radar-canvas");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const size = canvas.clientWidth;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;
  const n = AXES.length;

  const styles = getComputedStyle(document.documentElement);
  const gridColor = styles.getPropertyValue("--line-soft").trim();
  const fillColor = styles.getPropertyValue("--red-fill").trim();
  const strokeColor = styles.getPropertyValue("--red").trim();
  const textColor = styles.getPropertyValue("--ink-muted").trim();

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  [0.25, 0.5, 0.75, 1].forEach((frac) => {
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = radius * frac;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });

  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = gridColor;
    ctx.stroke();

    const labelX = cx + (radius + 26) * Math.cos(angle);
    const labelY = cy + (radius + 26) * Math.sin(angle);
    ctx.fillStyle = textColor;
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const label = AXES[i].name;
    wrapText(ctx, label, labelX, labelY, 70, 13);
  }

  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
    const normalized = (scores[AXES[idx].key] + 100) / 200;
    const r = radius * normalized;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const normalized = (scores[AXES[i].key] + 100) / 200;
    const r = radius * normalized;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = strokeColor;
    ctx.fill();
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  const lines = [];
  words.forEach((word) => {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  lines.push(line);
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight));
}

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", () => {
  resultsEl.hidden = true;
  introEl.hidden = false;
});

window.addEventListener("resize", () => {
  if (!resultsEl.hidden) {
    const scores = computeScores();
    drawRadar(scores);
  }
});
