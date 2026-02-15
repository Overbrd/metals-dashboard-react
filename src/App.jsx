import { useEffect, useState } from "react";
import "./App.css";

const METALS = [
  { symbol: "GC=F", name: "Gold", className: "gold" },
  { symbol: "SI=F", name: "Silver", className: "silver" },
  { symbol: "PL=F", name: "Platinum", className: "platinum" },
  { symbol: "PA=F", name: "Palladium", className: "palladium" },
  { symbol: "HG=F", name: "Copper", className: "copper" },
];

// Round to nearest hundredth AND force two decimals
const round = (num) => {
  if (num == null) return null;
  return (Math.round(num * 100) / 100).toFixed(2);
};

export default function App() {
  const [prices, setPrices] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});
  const [timestamp, setTimestamp] = useState(null);
  const [error, setError] = useState(null);

  const fetchAllMetals = () => {
    Promise.all(
      METALS.map((m) =>
        fetch(`/yahoo/v8/finance/chart/${m.symbol}`).then((r) => r.json())
      )
    )
      .then((results) => {
        const newPrices = {};
        let ts = null;

        results.forEach((data, i) => {
          const result = data.chart.result?.[0];
          if (!result) return;

          const price = round(result.meta.regularMarketPrice);
          newPrices[METALS[i].symbol] = price;

          if (!ts) ts = result.meta.regularMarketTime;
        });

        setPreviousPrices(prices);
        setPrices(newPrices);
        setTimestamp(new Date(ts * 1000).toLocaleString());
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetchAllMetals();
    const interval = setInterval(fetchAllMetals, 30000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  const getIndicator = (symbol) => {
    const prev = previousPrices[symbol];
    const curr = prices[symbol];
    if (!prev) return null;
    if (Number(curr) > Number(prev)) return <span className="up">▲</span>;
    if (Number(curr) < Number(prev)) return <span className="down">▼</span>;
    return <span className="neutral">•</span>;
  };

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="hero-icon">⛏️</div>
        <h1 className="hero-title">Metals Price Dashboard</h1>
        <p className="hero-subtitle">
          Live Gold, Silver, Platinum, Palladium & Copper Prices  
          <br />
          Auto‑refreshes every 30 seconds
        </p>
      </header>

      <section className="intro">
        <p>
          This dashboard was built using <strong>React 19</strong>,{" "}
          <strong>Vite</strong>, and a <strong>Vite proxy</strong> to securely
          fetch real‑time metals data from Yahoo Finance. It demonstrates clean
          component structure, modern hooks, auto‑refresh logic, and a polished
          UI suitable for portfolio‑grade data visualization.
        </p>
      </section>

      {error && <div className="error">Error: {error}</div>}

      <div className="cards">
        {METALS.map((m) => (
          <div key={m.symbol} className={`metal-card ${m.className}`}>
            <h2>{m.name}</h2>
            <div className="price">
              {prices[m.symbol] ? `$${prices[m.symbol]}` : "—"}
              {getIndicator(m.symbol)}
            </div>
          </div>
        ))}
      </div>

      <div className="timestamp">Last updated: {timestamp}</div>

      <footer className="footer">
        © 2026 MatthewLind.com — Metals Dashboard Demo
      </footer>
    </div>
  );
}
