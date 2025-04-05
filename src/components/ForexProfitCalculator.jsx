import React, { useState } from "react";

const currencyPairs = [
  "EUR/USD",
  "USD/JPY",
  "GBP/USD",
  "AUD/USD",
  "USD/CHF",
  "USD/CAD",
  "NZD/USD",
  "XAU/USD"
];

export default function ForexProfitCalculator() {
  const [pair, setPair] = useState("EUR/USD");
  const [entry, setEntry] = useState(0);
  const [exit, setExit] = useState(0);
  const [lotSize, setLotSize] = useState(1);
  const [conversionRate, setConversionRate] = useState(280);

  const isJPYPair = pair.includes("JPY");
  const isGold = pair === "XAU/USD";
  const pipSize = isGold ? 0.1 : isJPYPair ? 0.01 : 0.0001;
  const pipValue = isGold ? 1 : isJPYPair ? 1000 : 10;

  const pips = Math.abs(exit - entry) / pipSize;
  const profitUSD = pips * lotSize * pipValue;
  const profitLocal = profitUSD * conversionRate;

  return (
    <div className="max-w-xl mx-auto p-6 bg-zinc-400 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Forex Profit/Loss Calculator</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Currency Pair</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={pair}
          onChange={(e) => setPair(e.target.value)}
        >
          {currencyPairs.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Entry Price</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={entry}
          onChange={(e) => setEntry(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Exit Price</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={exit}
          onChange={(e) => setExit(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Lot Size</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={lotSize}
          onChange={(e) => setLotSize(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Conversion Rate (USD to PKR)</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={conversionRate}
          onChange={(e) => setConversionRate(parseFloat(e.target.value))}
        />
      </div>
      <div className="flex gap-4 mb-6 bg-emerald-900 p-4 text-white rounded-xl items-center cursor-pointer">
        <p className="text-xl">Designer:</p>
        <h1 className="text-2xl self-center">Saqlain Asif</h1>
      </div>
      <div className="bg-gray-200 rounded-lg p-4">
        <p className="font-semibold">Total Pips: <span className="text-blue-600">{pips.toFixed(2)}</span></p>
        <p className="font-semibold">Profit/Loss (USD): <span className="text-green-600">${profitUSD.toFixed(2)}</span></p>
        <p className="font-semibold">Profit/Loss (PKR): <span className="text-green-600">Rs {profitLocal.toFixed(2)}</span></p>
      </div>
    </div>
  );
}