# -IBM-Cognos-Analytics

# ThreadCraft Textiles — IBM Cognos Analytics
### Case Study 10 · AdroIT Technologies × IBM

A fully interactive web application for the ThreadCraft Textiles IBM Cognos Analytics Case Study — covering Production Efficiency, Export Fulfillment, Sales Analysis, Exploration, Dashboard, and Story Making.

---

## 🚀 Live Demo

Deploy on GitHub Pages — see instructions below.

---

## 📋 Features

| Module | Questions Covered |
|--------|-------------------|
| **Reporting** | Q1 – Production Efficiency Report with conditional styling |
| **Reporting** | Q2 – Export Order Fulfillment Report (sorted by worst performers) |
| **Reporting** | Q3 – Sales Revenue Visualization (Bar/Pie, interactive filters) |
| **Exploration** | Q4 – Fabric Waste & Rejection Analysis (Scatter, Doughnut, Bar) |
| **Dashboard** | Q5 – Operations Dashboard (KPI tiles, 3 charts, Alert table) |
| **Story Making** | Q6 – 6-Scene Cognos Story with metrics |

---

## 🗂️ File Structure

```
threadcraft/
├── index.html      # Main HTML — all sections & structure
├── style.css       # Industrial-luxury dark theme
├── app.js          # Chart.js charts, table logic, story engine
└── README.md       # This file
```

---

## 🛠️ Technologies Used

- **HTML5 / CSS3 / Vanilla JavaScript** — no build tools needed
- **Chart.js 4.4** — all charts (Bar, Line, Pie, Doughnut, Scatter)
- **Google Fonts** — Playfair Display · DM Sans · JetBrains Mono
- **Tailwind CDN** (unused — replaced with custom CSS for full control)

---

## 📦 Deploy to GitHub Pages

### Option 1 — Quick Deploy (Recommended)

1. Create a new GitHub repository (e.g. `threadcraft-analytics`)
2. Upload all 3 files: `index.html`, `style.css`, `app.js`
3. Go to **Settings → Pages**
4. Under **Source**, select `main` branch → `/ (root)` folder
5. Click **Save**
6. Your site will be live at: `https://<your-username>.github.io/threadcraft-analytics/`

### Option 2 — Using Git CLI

```bash
# 1. Create your repo on GitHub first, then:
git init
git add .
git commit -m "Initial commit: ThreadCraft Analytics"
git branch -M main
git remote add origin https://github.com/<your-username>/threadcraft-analytics.git
git push -u origin main

# 2. Enable GitHub Pages in repo Settings → Pages
```

---

## 🎨 Design

- **Theme**: Industrial Luxury Dark
- **Typography**: Playfair Display (headings) + DM Sans (body) + JetBrains Mono (data)
- **Color Palette**: Deep navy backgrounds, amber accent, semantic green/red/amber for KPIs
- **Conditional Styling**:
  - ✅ Green: Efficiency ≥ 90%
  - ⚠️ Amber: Efficiency 80–90% | Revenue below ₹1,00,000
  - 🔴 Red: Efficiency < 80% | Delayed export orders

---

## 📊 Dataset Simulated

- **Factories**: Tirupur, Surat
- **Garment Types**: T-Shirt, Kurta, Jeans, Dress, Denim, Formal Shirt, Kids Wear, Kurti
- **Seasons**: Summer, Winter, Festival
- **Export Buyers**: NordStyle GmbH, TrendMart US, FashionHub UK, Boutique Paris, StyleCo Japan, Trendy Dubai, Zara India, H&M Germany
- **Retail Cities**: Mumbai, Delhi, Bengaluru, Chennai (and 11 more)

---

## 📝 Case Study Questions

| Q# | Module | Topic |
|----|--------|-------|
| Q1 | Reporting | Production Efficiency by Factory & Garment Type |
| Q2 | Reporting | Export Order Fulfillment with Delivery Status |
| Q3 | Reporting | Sales Revenue Visualization (Bar/Pie + Filters) |
| Q4 | Exploration | Fabric Waste vs Rejection Correlation |
| Q5 | Dashboard | Operations KPIs, Charts, Alert Table |
| Q6 | Story Making | 6-Scene Quarterly Review |

---

## 👩‍💻 Author

Built for IBM Cognos Analytics Case Study — AdroIT Technologies  
Industry: **Garments & Textiles**

---

*No backend required. Fully static. Deploy anywhere.*
