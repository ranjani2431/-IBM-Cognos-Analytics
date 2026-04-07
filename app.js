// ============================================
//  ThreadCraft Textiles — IBM Cognos Analytics
//  app.js — All charts, tables, story logic
// ============================================

// ---- Chart.js global defaults ----
Chart.defaults.color = '#8892a4';
Chart.defaults.borderColor = '#2a3048';
Chart.defaults.font.family = "'DM Sans', sans-serif";

const COLORS = {
  accent: '#f5a623',
  blue:   '#3b82f6',
  green:  '#22c55e',
  red:    '#ef4444',
  amber:  '#f59e0b',
  indigo: '#6366f1',
  purple: '#a855f7',
  teal:   '#14b8a6',
};

// ============ Q1 — PRODUCTION EFFICIENCY DATA ============
const efficiencyData = [
  { factory: 'Tirupur', garment: 'T-Shirt',   season: 'Summer',   planned: 5000, produced: 4750, rejected: 120 },
  { factory: 'Tirupur', garment: 'Kurta',     season: 'Festival', planned: 4200, produced: 4000, rejected: 200 },
  { factory: 'Tirupur', garment: 'Jeans',     season: 'Winter',   planned: 3800, produced: 3610, rejected: 180 },
  { factory: 'Tirupur', garment: 'Dress',     season: 'Summer',   planned: 2900, produced: 2755, rejected: 100 },
  { factory: 'Surat',   garment: 'Denim',     season: 'Winter',   planned: 4000, produced: 3040, rejected: 320 },
  { factory: 'Surat',   garment: 'Formal Shirt', season: 'Summer', planned: 3500, produced: 3290, rejected: 160 },
  { factory: 'Surat',   garment: 'Kids Wear', season: 'Festival', planned: 2800, produced: 2380, rejected: 210 },
  { factory: 'Surat',   garment: 'Kurti',     season: 'Winter',   planned: 3200, produced: 2950, rejected: 140 },
];

function calcEfficiency(row) {
  return ((row.produced / row.planned) * 100).toFixed(1);
}

function getEffClass(eff) {
  if (eff >= 90) return 'eff-green';
  if (eff >= 80) return 'eff-amber';
  return 'eff-red';
}

function filterTable() {
  const factory = document.getElementById('factoryFilter').value;
  const season  = document.getElementById('seasonFilter').value;
  const tbody   = document.getElementById('efficiencyBody');
  tbody.innerHTML = '';

  const filtered = efficiencyData.filter(r =>
    (factory === 'all' || r.factory === factory) &&
    (season  === 'all' || r.season  === season)
  );

  filtered.forEach(r => {
    const eff = calcEfficiency(r);
    const cls = getEffClass(parseFloat(eff));
    tbody.innerHTML += `
      <tr>
        <td>${r.factory}</td>
        <td>${r.garment}</td>
        <td>${r.season}</td>
        <td>${r.planned.toLocaleString()}</td>
        <td>${r.produced.toLocaleString()}</td>
        <td>${r.rejected.toLocaleString()}</td>
        <td class="${cls}">${eff}%</td>
      </tr>`;
  });
}

filterTable();

// Efficiency Bar Chart
const effCtx = document.getElementById('efficiencyChart').getContext('2d');
new Chart(effCtx, {
  type: 'bar',
  data: {
    labels: efficiencyData.map(r => r.factory + ' – ' + r.garment),
    datasets: [{
      label: 'Efficiency %',
      data: efficiencyData.map(r => parseFloat(calcEfficiency(r))),
      backgroundColor: efficiencyData.map(r => {
        const e = parseFloat(calcEfficiency(r));
        if (e >= 90) return COLORS.green;
        if (e >= 80) return COLORS.amber;
        return COLORS.red;
      }),
      borderRadius: 6,
    }]
  },
  options: {
    responsive: true,
    indexAxis: 'y',
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ctx.parsed.x.toFixed(1) + '%' } } },
    scales: {
      x: { min: 60, max: 100, grid: { color: 'rgba(255,255,255,0.04)' } },
      y: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  }
});

// ============ Q2 — EXPORT FULFILLMENT DATA ============
const exportData = [
  { buyer: 'NordStyle GmbH',   ordered: 8000, delivered: 5440, status: 'Delayed' },
  { buyer: 'TrendMart US',     ordered: 6000, delivered: 4500, status: 'Delayed' },
  { buyer: 'FashionHub UK',    ordered: 7000, delivered: 5530, status: 'Delayed' },
  { buyer: 'Boutique Paris',   ordered: 3500, delivered: 3010, status: 'Delayed' },
  { buyer: 'StyleCo Japan',    ordered: 4500, delivered: 4050, status: 'On-Time' },
  { buyer: 'Trendy Dubai',     ordered: 5000, delivered: 4600, status: 'On-Time' },
  { buyer: 'Zara India',       ordered: 9000, delivered: 8820, status: 'On-Time' },
  { buyer: 'H&M Germany',      ordered: 7500, delivered: 7050, status: 'On-Time' },
].sort((a, b) => (a.delivered/a.ordered) - (b.delivered/b.ordered));

const exportBody = document.getElementById('exportBody');
exportData.forEach(r => {
  const rate = ((r.delivered / r.ordered) * 100).toFixed(1);
  const isDelayed = r.status === 'Delayed';
  exportBody.innerHTML += `
    <tr class="${isDelayed ? 'delayed-row' : ''}">
      <td>${r.buyer}</td>
      <td>${r.ordered.toLocaleString()}</td>
      <td>${r.delivered.toLocaleString()}</td>
      <td class="${parseFloat(rate) < 80 ? 'eff-red' : parseFloat(rate) < 90 ? 'eff-amber' : 'eff-green'}">${rate}%</td>
      <td class="${isDelayed ? 'status-text' : ''}">${r.status}</td>
    </tr>`;
});

const expCtx = document.getElementById('exportChart').getContext('2d');
new Chart(expCtx, {
  type: 'bar',
  data: {
    labels: exportData.map(r => r.buyer),
    datasets: [
      { label: 'Ordered',   data: exportData.map(r => r.ordered),   backgroundColor: 'rgba(59,130,246,0.3)', borderRadius: 4 },
      { label: 'Delivered', data: exportData.map(r => r.delivered), backgroundColor: exportData.map(r => r.status === 'Delayed' ? 'rgba(239,68,68,0.7)' : 'rgba(34,197,94,0.7)'), borderRadius: 4 },
    ]
  },
  options: {
    responsive: true,
    indexAxis: 'y',
    plugins: { legend: { position: 'top' } },
    scales: { x: { grid: { color: 'rgba(255,255,255,0.04)' } }, y: { grid: { display: false }, ticks: { font: { size: 10 } } } }
  }
});

// ============ Q3 — SALES CHART ============
const salesData = {
  labels: ['T-Shirt', 'Kurta', 'Jeans', 'Dress', 'Denim', 'Formal Shirt', 'Kids Wear', 'Kurti'],
  all:     [185000, 320000, 145000,  82000, 210000, 175000,  68000, 295000],
  Summer:  [180000, 120000, 100000, 140000, 140000, 110000,  50000, 160000],
  Winter:  [120000, 180000, 160000,  60000, 190000, 200000,  80000, 260000],
  Festival:[260000, 450000, 170000, 110000, 260000, 180000,  80000, 370000],
};

let salesChartInst = null;

function switchSalesChart() {
  const type   = document.getElementById('chartTypeSelect').value;
  const season = document.getElementById('salesSeasonFilter').value;
  const vals   = season === 'all' ? salesData.all : salesData[season];
  const threshold = 100000;

  if (salesChartInst) salesChartInst.destroy();

  const ctx = document.getElementById('salesChart').getContext('2d');
  salesChartInst = new Chart(ctx, {
    type,
    data: {
      labels: salesData.labels,
      datasets: [{
        label: 'Revenue (₹)',
        data: vals,
        backgroundColor: vals.map(v => v < threshold ? COLORS.amber : type === 'pie' ? [COLORS.blue, COLORS.green, COLORS.accent, COLORS.indigo, COLORS.teal, COLORS.purple, COLORS.red, COLORS.amber][salesData.labels.indexOf(salesData.labels[vals.indexOf(v)])] : COLORS.blue),
        borderRadius: type === 'bar' ? 6 : 0,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: type === 'pie', position: 'right' },
        tooltip: { callbacks: { label: ctx => '₹' + ctx.parsed.y?.toLocaleString() || '₹' + ctx.parsed.toLocaleString() } }
      },
      scales: type === 'pie' ? {} : {
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => '₹' + (v/1000).toFixed(0) + 'K' } },
        x: { grid: { display: false } }
      }
    }
  });
}

switchSalesChart();

// ============ Q4 — EXPLORATION CHARTS ============

// Scatter: Fabric Wasted vs Units Rejected
const scatterCtx = document.getElementById('wasteScatter').getContext('2d');
const scatterPoints = [
  {x:120,y:85},{x:95,y:62},{x:210,y:180},{x:75,y:45},{x:300,y:260},{x:140,y:110},
  {x:180,y:150},{x:60,y:38},{x:245,y:200},{x:90,y:70},{x:165,y:130},{x:55,y:30},
];
new Chart(scatterCtx, {
  type: 'scatter',
  data: { datasets: [{ label: 'Batches', data: scatterPoints, backgroundColor: COLORS.accent, pointRadius: 6 }] },
  options: {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => `Waste: ${c.parsed.x}m, Rejected: ${c.parsed.y}` } } },
    scales: {
      x: { title: { display: true, text: 'Fabric Wasted (m)', color: '#8892a4' }, grid: { color: 'rgba(255,255,255,0.04)' } },
      y: { title: { display: true, text: 'Units Rejected', color: '#8892a4' }, grid: { color: 'rgba(255,255,255,0.04)' } }
    }
  }
});

// Fabric Waste by Type
const fabricCtx = document.getElementById('fabricWasteBar').getContext('2d');
new Chart(fabricCtx, {
  type: 'doughnut',
  data: {
    labels: ['Denim', 'Cotton', 'Polyester', 'Silk', 'Linen', 'Blended'],
    datasets: [{ data: [38, 22, 16, 10, 8, 6], backgroundColor: [COLORS.red, COLORS.blue, COLORS.accent, COLORS.indigo, COLORS.teal, COLORS.green], borderWidth: 0 }]
  },
  options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 10 } } } } }
});

// Season vs Sales
const seasonCtx = document.getElementById('seasonSalesBar').getContext('2d');
new Chart(seasonCtx, {
  type: 'bar',
  data: {
    labels: ['Summer', 'Winter', 'Festival'],
    datasets: [{ label: 'Units Sold (K)', data: [42, 58, 101], backgroundColor: [COLORS.amber, COLORS.blue, COLORS.green], borderRadius: 8 }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { grid: { color: 'rgba(255,255,255,0.04)' } }, x: { grid: { display: false } } }
  }
});

// ============ Q5 — DASHBOARD CHARTS ============

// Revenue by Garment Type
const dashRevCtx = document.getElementById('dashRevBar').getContext('2d');
new Chart(dashRevCtx, {
  type: 'bar',
  data: {
    labels: ['T-Shirt', 'Kurta', 'Jeans', 'Dress', 'Kurti', 'Formal'],
    datasets: [{ label: 'Revenue (₹L)', data: [1.85, 3.20, 1.45, 0.82, 2.95, 1.75], backgroundColor: [COLORS.blue, COLORS.green, COLORS.accent, COLORS.amber, COLORS.indigo, COLORS.teal], borderRadius: 6 }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => '₹' + v + 'L' } },
      x: { grid: { display: false } }
    }
  }
});

// Monthly Production Trend
const dashProdCtx = document.getElementById('dashProdLine').getContext('2d');
new Chart(dashProdCtx, {
  type: 'line',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Tirupur', data: [9200,8800,9500,10100,9800,10400,10800,10200,9900,11200,12500,13100],
        borderColor: COLORS.accent, backgroundColor: 'rgba(245,166,35,0.08)', fill: true, tension: 0.4, pointRadius: 3,
      },
      {
        label: 'Surat', data: [7100,6800,7400,7900,7600,8100,8300,7900,7700,8800,9600,10200],
        borderColor: COLORS.blue, backgroundColor: 'rgba(59,130,246,0.08)', fill: true, tension: 0.4, pointRadius: 3,
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'top', labels: { boxWidth: 12 } } },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.04)' } },
      x: { grid: { display: false } }
    }
  }
});

// Order Type Pie
const dashPieCtx = document.getElementById('dashOrderPie').getContext('2d');
new Chart(dashPieCtx, {
  type: 'doughnut',
  data: {
    labels: ['Domestic', 'Export'],
    datasets: [{ data: [58, 42], backgroundColor: [COLORS.blue, COLORS.accent], borderWidth: 0, hoverOffset: 8 }]
  },
  options: {
    responsive: true,
    cutout: '65%',
    plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
  }
});

// ============ DASHBOARD FILTER ============
function setDashFilter(filter, btn) {
  document.querySelectorAll('.dash-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // In a real app, this would re-query filtered data
  // For demo, we animate KPI tiles
  const kpiVariants = {
    all:      { units: '1,24,800', eff: '92%', waste: '6.4%', export: '83%' },
    Tirupur:  { units: '72,400',   eff: '94%', waste: '4.8%', export: '88%' },
    Surat:    { units: '52,400',   eff: '87%', waste: '8.6%', export: '76%' },
    Summer:   { units: '38,200',   eff: '91%', waste: '5.9%', export: '82%' },
    Winter:   { units: '41,600',   eff: '90%', waste: '7.1%', export: '80%' },
    Festival: { units: '45,000',   eff: '93%', waste: '6.2%', export: '87%' },
  };
  const v = kpiVariants[filter] || kpiVariants.all;
  document.getElementById('kpiUnits').textContent   = v.units;
  document.getElementById('kpiEff').textContent     = v.eff;
  document.getElementById('kpiWaste').textContent   = v.waste;
  document.getElementById('kpiExport').textContent  = v.export;
}

// ============ Q6 — STORY SCENES ============
const scenes = [
  {
    scene: 'Scene 1 of 6',
    title: 'Company Overview & Production Summary',
    body: `ThreadCraft Textiles operates two manufacturing facilities — Tirupur and Surat — and sells across 15 Indian cities with exports to 8 international buyers. Together, both factories produced over 1,24,800 units this quarter.`,
    metrics: [
      { val: '1,24,800', label: 'UNITS PRODUCED' },
      { val: '2',        label: 'FACTORIES' },
      { val: '15',       label: 'RETAIL CITIES' },
      { val: '8',        label: 'EXPORT BUYERS' },
    ]
  },
  {
    scene: 'Scene 2 of 6',
    title: 'Factory-wise Efficiency Analysis',
    body: `Tirupur factory leads with 94% efficiency, consistently producing above planned targets for T-Shirts and Kurtas. Surat's Denim line is the outlier at 76%, pulling the combined average to 92%. Immediate process review recommended for Surat Denim operations.`,
    metrics: [
      { val: '94%', label: 'TIRUPUR EFF.' },
      { val: '87%', label: 'SURAT EFF.' },
      { val: '92%', label: 'COMBINED AVG' },
      { val: '76%', label: 'DENIM (LOWEST)' },
    ]
  },
  {
    scene: 'Scene 3 of 6',
    title: 'Fabric Waste & Rejection Root Causes',
    body: `Denim fabric accounts for 38% of total fabric waste. Strong correlation (r=0.82) found between fabric waste and units rejected. Surat factory generates 1.8× more waste per unit than Tirupur. Festival season shows peak rejection rates, suggesting overtime pressure as the root cause.`,
    metrics: [
      { val: '38%',  label: 'DENIM WASTE SHARE' },
      { val: '0.82', label: 'WASTE-REJECT CORR.' },
      { val: '8%',   label: 'OVERALL REJECT RATE' },
      { val: '1.8×', label: 'SURAT WASTE RATIO' },
    ]
  },
  {
    scene: 'Scene 4 of 6',
    title: 'Export Order Performance & Buyer Analysis',
    body: `3 out of 8 buyers are below the 80% fulfillment threshold. NordStyle GmbH (Germany) is the most critical at 68%. Zara India leads at 98% fulfillment. Export compliance average stands at 83.4%, requiring urgent attention on delayed shipments.`,
    metrics: [
      { val: '83.4%', label: 'EXPORT COMPLIANCE' },
      { val: '68%',   label: 'WORST BUYER (NORD)' },
      { val: '98%',   label: 'BEST BUYER (ZARA)' },
      { val: '3',     label: 'BUYERS BELOW 80%' },
    ]
  },
  {
    scene: 'Scene 5 of 6',
    title: 'Retail Sales by Season & Category',
    body: `Festival season drives 2.4× the sales volume of Summer. Kurtas are the top-selling garment type with ₹3.2L revenue. Kids Wear and Dress categories fall below the ₹1,00,000 threshold and need promotional support. Mumbai and Delhi account for 48% of total retail revenue.`,
    metrics: [
      { val: '₹3.2L', label: 'TOP ITEM (KURTA)' },
      { val: '2.4×',  label: 'FESTIVAL UPLIFT' },
      { val: '48%',   label: 'MUM + DELHI SHARE' },
      { val: '2',     label: 'CATEGORIES BELOW ₹1L' },
    ]
  },
  {
    scene: 'Scene 6 of 6',
    title: 'Operational Improvement Plan',
    body: `Based on the quarterly analysis, three priority actions are recommended:`,
    bullets: [
      'Deploy lean manufacturing practices at Surat Denim line to raise efficiency above 85%',
      'Implement fabric usage controls to reduce waste by at least 30% within 2 quarters',
      'Establish buyer SLA agreements to bring export fulfillment above 90% across all buyers',
      'Launch promotional campaigns for Kids Wear and Dress categories in off-season periods',
      'Set up monthly Dashboard reviews for Factory Managers using IBM Cognos Alerts',
    ],
    metrics: [
      { val: '85%+', label: 'EFFICIENCY TARGET' },
      { val: '30%',  label: 'WASTE REDUCTION GOAL' },
      { val: '90%+', label: 'EXPORT TARGET' },
      { val: 'Q2',   label: 'TIMELINE' },
    ]
  },
];

let currentScene = 0;

function renderScene() {
  const s = scenes[currentScene];
  let html = `
    <div class="story-scene-tag">${s.scene}</div>
    <div class="story-scene-title">${s.title}</div>
    <div class="story-scene-body">
      <p>${s.body}</p>
      ${s.bullets ? '<ul>' + s.bullets.map(b => `<li>${b}</li>`).join('') + '</ul>' : ''}
    </div>
    <div class="story-metrics">
      ${s.metrics.map(m => `
        <div class="story-metric">
          <div class="story-metric-val">${m.val}</div>
          <div class="story-metric-label">${m.label}</div>
        </div>`).join('')}
    </div>`;
  document.getElementById('storyStage').innerHTML = html;

  // Dots
  const dots = document.getElementById('storyDots');
  dots.innerHTML = scenes.map((_, i) =>
    `<div class="story-dot ${i === currentScene ? 'active' : ''}" onclick="goToScene(${i})"></div>`
  ).join('');
}

function changeScene(dir) {
  currentScene = Math.max(0, Math.min(scenes.length - 1, currentScene + dir));
  renderScene();
  document.getElementById('storyStage').style.animation = 'none';
  requestAnimationFrame(() => { document.getElementById('storyStage').style.animation = ''; });
}

function goToScene(idx) {
  currentScene = idx;
  renderScene();
}

renderScene();

// ============ SMOOTH SCROLL HEADER ============
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});