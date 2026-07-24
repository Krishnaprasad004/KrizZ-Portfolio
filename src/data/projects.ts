export interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  /** CSS `background-image` value — a gradient placeholder for now, a `url(...)` once real screenshots exist. */
  coverImage: string;
  problem?: string;
  approach?: string;
  toolsUsed?: string[];
  result?: string;
  githubUrl?: string;
  demoUrl?: string;
  /** Dashboard/report case studies only — omitted for code projects. */
  dashboardOverview?: string;
  kpis?: string[];
  visualizations?: string[];
  insights?: string[];
  features?: string[];
  businessValue?: string;
  /** Additional screenshots beyond coverImage, shown as a gallery on the case study page. */
  gallery?: string[];
}

export const projects: Project[] = [
  {
    title: "Food Delivery Platform (Databricks)",
    slug: "food-delivery-platform-databricks",
    description:
      "A full-stack food delivery analytics dashboard: React + Vite frontend, FastAPI backend, live-queried against Databricks.",
    tags: ["Databricks", "Data Engineering"],
    coverImage: "url(/projects/food-delivery-analytics/dashboard-overview.png)",
    gallery: [
      "/projects/food-delivery-analytics/dashboard-overview.png",
      "/projects/food-delivery-analytics/welcome-screen.png",
      "/projects/food-delivery-analytics/recent-orders-table.png",
      "/projects/food-delivery-analytics/databricks-payment-methods.png",
      "/projects/food-delivery-analytics/databricks-order-status.png",
      "/projects/food-delivery-analytics/databricks-delivery-time.png",
      "/projects/food-delivery-analytics/databricks-revenue.png",
    ],
    problem:
      "Businesses need real-time visibility into delivery operations, but connecting a modern web interface directly to an enterprise-scale data platform is a full-stack challenge, not just a notebook or script.",
    approach:
      "Built a three-layer full-stack app: a React + Vite frontend for interactive charts, a FastAPI backend serving as the analytics API layer, and Databricks as the underlying data platform, queried directly via the Databricks SQL Connector.",
    toolsUsed: [
      "React",
      "Vite",
      "Recharts",
      "FastAPI",
      "Databricks SQL Connector",
      "Pandas",
      "Databricks",
    ],
    features: [
      "7 REST endpoints (total orders, avg delivery time, payment-method split, order-status split, recent orders, CSV export)",
      "Live dashboard: total orders, avg delivery time, payment-method breakdown, order-status breakdown, recent-orders table with pagination",
      "One-click CSV export of the full orders dataset",
      "Single-port production mode — FastAPI serves the built React app and the API from the same process",
    ],
    result:
      "A working end-to-end pipeline from Databricks-hosted data through a FastAPI analytics layer to real-time interactive charts in the browser, with a one-command setup and run script for reproducibility.",
    githubUrl: "https://github.com/Krishnaprasad004/Food_Delivery_Databricks",
  },
  {
    title: "AI GTM Outreach Automation",
    slug: "ai-gtm-outreach-automation",
    description:
      "A campaign-agnostic n8n outreach engine: AI-researched, AI-written cold email personalization, batch-processed with compliance gating and per-recipient error handling.",
    tags: ["Python", "AI", "Automation"],
    coverImage: "url(/projects/ai-gtm-outreach-automation/workflow-canvas-v4.png)",
    gallery: [
      "/projects/ai-gtm-outreach-automation/workflow-canvas-v4.png",
      "/projects/ai-gtm-outreach-automation/workflow-canvas-v3.png",
      "/projects/ai-gtm-outreach-automation/workflow-canvas-v2.png",
      "/projects/ai-gtm-outreach-automation/n8n-dashboard.png",
    ],
    problem:
      "Manually researching a prospect and writing a personalized cold email per lead doesn't scale, and doing it by hand makes it easy to accidentally email someone who withdrew consent or asked not to be contacted.",
    approach:
      "Built a 25-node n8n workflow that filters a lead sheet through a five-condition compliance gate (status, do-not-contact, suppression, email presence, consent), then runs two chained LLM calls per lead — company research, then email copywriting from that research — before sending via Gmail and logging the outcome back to the sheet. Campaign behavior (prompts, model, temperature, token limits) is externalized into version-controlled JSON configs per campaign type, so one workflow serves multiple outreach campaigns instead of being duplicated per campaign.",
    dashboardOverview:
      "Rebuilt through 3 documented versions: v2 was a 10-node, single-lead-per-run proof of concept with no error handling and a hardcoded, leaked API key. v3 rebuilt it into a 19-node batch pipeline with retries, rate limiting, and per-recipient error branches, and fixed the leaked-key and item-correlation bugs. v4 (current) generalized it into the 25-node, config-driven, multi-campaign engine described above.",
    kpis: [],
    visualizations: [],
    insights: [
      "A hardcoded, plaintext Groq API key was found committed in the original workflow export and fixed by moving auth to n8n's encrypted credential store.",
      "A latent item-correlation bug (direct node references instead of pairedItem lineage) would have silently misattributed leads to the wrong recipient once batch processing was introduced — caught during a full engineering review before shipping.",
      "The gallery above spans the full documented version history: v2 (10-node baseline), v3 (19-node, batch + error handling), and the current v4 (25-node, config-driven multi-campaign engine) canvas.",
    ],
    features: [
      "Campaign-agnostic: one workflow, multiple outreach campaign types via version-controlled JSON configs",
      "Five-condition compliance/idempotency gate (status, do-not-contact, suppression, email, consent)",
      "Two-stage LLM pipeline per lead: research call, then email-copywriting call using that research",
      "Automatic retry (3x) + 30s timeout on every LLM call, with per-recipient error branches that don't stop the batch",
      "Rate-limited batch processing of an entire lead sheet per run, with a run-level sent/failed summary email",
    ],
    businessValue:
      "Replaces manual per-lead research-and-write SDR work with an unattended batch run that still respects consent/suppression rules and survives individual API or parsing failures without stopping the whole outreach run.",
    toolsUsed: ["n8n", "Groq (Llama 3.3 70B)", "Google Sheets", "Gmail API"],
    result:
      "A production-hardened, 25-node n8n workflow with documented before/after engineering review (architecture, code, prompts, API usage, security, scalability), a full execution-flow writeup, and CI validation that scans the exported workflow JSON for hardcoded credentials.",
    githubUrl:
      "https://github.com/Krishnaprasad004/AI-GTM-Outreach-Automation",
  },
  {
    title: "Article Plagiarism Detection",
    slug: "article-plagiarism-detection",
    description:
      "A Flask app that checks uploaded manuscripts for plagiarism against a reference corpus using two independent techniques: n-gram fingerprinting and transformer-embedding similarity.",
    tags: ["Python", "NLP"],
    coverImage:
      "url(/projects/article-plagiarism-detection/similarity-percentage.png)",
    gallery: [
      "/projects/article-plagiarism-detection/similarity-percentage.png",
      "/projects/article-plagiarism-detection/winnowing-similarity.png",
      "/projects/article-plagiarism-detection/similarity-network-graph.png",
      "/projects/article-plagiarism-detection/graph-density.png",
      "/projects/article-plagiarism-detection/cosine-similarity-scores.png",
      "/projects/article-plagiarism-detection/dense-similarity-graph.png",
    ],
    problem:
      "Detecting whether an uploaded manuscript overlaps — exactly or semantically — with a known set of prior scientific papers, without relying on a single similarity technique that misses either verbatim copying or paraphrased plagiarism.",
    approach:
      "Built a Flask app that runs two independent similarity methods on every upload: Winnowing (k-gram MD5 fingerprinting + Jaccard similarity) for exact/near-exact matches, and cosine similarity over sentence-transformer embeddings (all-MiniLM-L6-v2) for semantic matches. Separately, prototyped a custom Graph Autoencoder (2-layer GCNConv, PyTorch Geometric) in a research notebook, trained for 50 epochs on a TF-IDF similarity graph of 100 arXiv astro-ph abstracts, to explore learned document embeddings as a reference corpus.",
    toolsUsed: [
      "Flask",
      "Hugging Face Transformers",
      "PyTorch",
      "PyTorch Geometric",
      "scikit-learn",
      "NetworkX",
      "python-docx",
      "PyPDF2",
    ],
    features: [
      "Multi-format upload support: TXT, DOCX, PDF, extracted behind one unified interface",
      "Winnowing fingerprinting implemented from scratch (MD5 k-gram hashing + minimum-hash sliding window)",
      "Live semantic similarity via a pretrained sentence-transformer, run against every reference document per upload",
      "Three generated visualizations per analysis: similarity bar chart, NetworkX similarity graph, top-10 comparison chart",
      "User registration/login with a local SQLite-backed auth system",
    ],
    result:
      "A working dual-technique plagiarism checker with a from-scratch Winnowing implementation, a pretrained-transformer semantic similarity path, and a separate research notebook documenting a custom-trained Graph Autoencoder explored as an alternative embedding source.",
    githubUrl: "https://github.com/Krishnaprasad004/Article_plagiarism",
  },
  {
    title: "Car Performance and Pricing Analysis",
    slug: "car-performance-and-pricing-analysis",
    description:
      "A 3-page Power BI dashboard analyzing web-scraped car specs and pricing across brands, engines, and fuel types.",
    tags: ["Power BI", "DAX", "Data Visualization"],
    coverImage: "url(/projects/car-performance-analysis/overview.png)",
    gallery: [
      "/projects/car-performance-analysis/overview.png",
      "/projects/car-performance-analysis/company-engine-breakdown.png",
      "/projects/car-performance-analysis/performance-vs-price.png",
    ],
    problem:
      "Raw web-scraped car specs and pricing data (company, engine, fuel type, horsepower, torque, power-to-weight ratio, 0-100 km/h, seats, price) has no way to compare performance against price across the market without manually cross-referencing spreadsheets.",
    approach:
      "Built a 3-page interactive Power BI report on top of the scraped dataset: an Overview page with headline KPIs and a fuel-type/company breakdown, a Company & Engine Breakdown page comparing horsepower and price across manufacturers and engines, and a Performance vs. Price page plotting acceleration against price and torque. All three pages share cross-filtering slicers (Company, Engine, Fuel Type, Car Name) built with DAX measures on top of the raw fields.",
    dashboardOverview:
      "Page 1 (Overview) surfaces total cars, average price, average horsepower, power-to-weight ratio, a fuel-type donut, a company-count treemap, and an average-price-by-company bar chart, plus a cylindrical gauge visual for average car price. Page 2 (Company & Engine Breakdown) uses a company-name word cloud, a horsepower-by-fuel-type/power-to-weight column chart, a cars-by-seats-and-fuel-type chart, and an average-price-by-company-and-engine bar chart. Page 3 (Performance vs. Price) plots a 0-100 km/h-vs-price scatter (colored by horsepower), a price gauge, torque and price-tier KPI cards, a fuel-type pivot table of car names, and a seats-by-fuel-type ribbon chart.",
    kpis: [
      "Total Cars",
      "Average Car Price (INR)",
      "Average Horsepower",
      "Power-to-Weight Ratio",
      "Sum of Torque",
      "Price Tier (count)",
    ],
    visualizations: [
      "Donut chart — car count by fuel type",
      "Treemap — car count by company",
      "Word cloud — company names",
      "Bar chart — average price by company & engine",
      "Column chart — horsepower by fuel type & power-to-weight ratio",
      "Scatter chart — 0-100 km/h performance vs. price, colored by horsepower",
      "Ribbon chart — car count by seats & fuel type",
      "Pivot table — car names by fuel type",
      "Cylindrical gauge & radial gauge — average/price-range KPIs",
    ],
    insights: [
      "Petrol dominates the dataset by volume (72.45% of total cars), with diesel a distant second (8%).",
      "A small cluster of hypercar brands (Bugatti, Ferrari, Lamborghini) sits far outside the main price-vs-performance range on the scatter chart, well above the rest of the market on both price and 0-100 km/h.",
      "Diesel vehicles carry disproportionately higher average horsepower than other fuel types in the horsepower-by-fuel-type breakdown.",
      "Company-level average pricing varies widely by engine within the same manufacturer, visible in the stacked price-by-company-and-engine chart.",
    ],
    features: [
      "Cross-filtering slicers for Company Name, Engine, Fuel Type, and Car Name shared across all 3 pages",
      "Custom Power BI visuals: word cloud, cylindrical gauge, ribbon chart, mass filter",
      "In-report page navigation buttons (Page 2 / Page 3)",
      "DAX measures for average price, average horsepower, and power-to-weight ratio aggregation",
    ],
    businessValue:
      "Gives a car buyer, analyst, or dealership a single filterable view to see which brands and fuel types dominate the market, how performance specs actually trade off against price, and where a given company or engine sits relative to the rest of the market — instead of manually cross-referencing spec sheets.",
    toolsUsed: ["Power BI Desktop", "DAX", "Web-scraped dataset"],
    result:
      "A working 3-page Power BI report covering the full scraped dataset, with shared slicers, custom visuals (word cloud, cylindrical gauge, ribbon chart), and cross-filtered KPIs, DAX measures, and charts tying performance specs to pricing across companies, engines, and fuel types.",
    githubUrl: "https://github.com/Krishnaprasad004/Car-Performance-Analysis",
  },
  {
    title: "Apple Stock Analysis",
    slug: "apple-stock-analysis",
    description:
      "Exploratory data analysis of Apple's (AAPL) full historical stock price record in a Jupyter notebook with Pandas, Matplotlib, and Seaborn.",
    tags: ["Python", "Pandas", "Time Series"],
    coverImage: "url(/projects/apple-stock-analysis/closing-price-trend.png)",
    gallery: [
      "/projects/apple-stock-analysis/closing-price-trend.png",
      "/projects/apple-stock-analysis/avg-price-by-month.png",
      "/projects/apple-stock-analysis/daily-price-range.png",
      "/projects/apple-stock-analysis/avg-price-per-year.png",
      "/projects/apple-stock-analysis/closing-price-distribution.png",
      "/projects/apple-stock-analysis/daily-pct-change.png",
    ],
    problem:
      "A raw historical OHLCV (Open/High/Low/Close/Volume) price CSV for AAPL, spanning 1980 to 2025, has no visible trend, seasonality, or volatility structure until it's cleaned, time-indexed, and charted.",
    approach:
      "Loaded the CSV into Pandas, parsed and timezone-normalized the Date column (pd.to_datetime with UTC handling, then tz-localized to naive), sorted chronologically, and derived Year and Month columns for grouping. Built six Matplotlib/Seaborn charts on top of that cleaned frame: a full-history closing price line, a month-of-year average bar chart (seaborn coolwarm palette, calendar-ordered), a High/Low daily range fill with Close overlaid, a year-by-year average bar chart (viridis palette), a histogram+KDE of the closing price distribution, and a pct_change()-based daily percentage change line with a zero reference line.",
    dashboardOverview:
      "A single Jupyter notebook (exported to Apple_stocks.html for viewing without re-running it) that runs top to bottom: load & clean the CSV, derive Year/Month features, then six sequential chart cells, each rendered inline with matplotlib.pyplot.",
    kpis: [],
    visualizations: [
      "Line chart — Apple Closing Price Trend Over Time (full 1980-2025 history)",
      "Bar chart — Average Closing Price by Month (Jan-Dec, coolwarm palette)",
      "Fill/area chart — Apple Daily Price Range (High vs Low) with Close overlaid",
      "Bar chart — Average Closing Price per Year (viridis palette)",
      "Histogram + KDE — Distribution of Daily Closing Prices",
      "Line chart — Daily Percentage Change in Closing Price, with a zero reference line",
    ],
    insights: [
      "Closing price stayed under roughly $5 for essentially the entire 1980-2005 span before compounding sharply from the 2010s onward, reaching a peak above $260 by 2025 — visible directly on the full-history line chart's shape.",
      "Year-by-year average closing price is effectively flat and near-zero from 1980 through the early 2000s, then climbs every year from 2020-2025, each year higher than the last.",
      "The distribution of all daily closing prices is heavily right-skewed: roughly 7,000+ trading days cluster in the $0-5 range, with a long thin tail stretching out to ~$260 — a direct consequence of the multi-decade price growth.",
      "Average closing price by month (computed across the full history) is highest in July-September and lowest in January/March/April/June/November, though this reflects the calendar distribution of the dataset's growth years, not a controlled seasonal effect.",
      "Daily percentage change oscillates in a roughly ±10% band across most of the history, with a small number of sharp outlier spikes (including one drop past -50% in a single day) visible in the volatility chart.",
    ],
    features: [
      "Full data cleaning pipeline: UTC parsing, timezone normalization, chronological sort",
      "Derived Year/Month features for group-by aggregation",
      "Six distinct chart types covering trend, seasonality, range, yearly comparison, distribution, and volatility",
      "Notebook exported to a standalone HTML file so the full analysis (code + charts) is viewable without running Jupyter",
    ],
    businessValue:
      "Gives anyone evaluating AAPL's long-run price behavior a single notebook that turns a raw multi-decade CSV into six specific, reusable views of trend, seasonality, yearly growth, price distribution, and daily volatility — a starting point for further quantitative analysis without redoing the cleaning and charting groundwork.",
    toolsUsed: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook"],
    result:
      "A complete, runnable notebook (plus a static HTML export) that cleans a raw AAPL OHLCV CSV and produces six charts covering long-term trend, monthly and yearly averages, daily high/low range, closing-price distribution, and daily percentage volatility.",
    githubUrl: "https://github.com/Krishnaprasad004/Apple-Stock-Analysis",
  },
];
