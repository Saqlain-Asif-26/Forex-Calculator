import React, { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const currencyPairs = [
  "EUR/USD",
  "USD/JPY",
  "GBP/USD",
  "AUD/USD",
  "USD/CHF",
  "USD/CAD",
  "NZD/USD",
  "XAU/USD",
];

export default function ForexProfitCalculator() {
  const [pair, setPair] = useState("EUR/USD");
  const [entry, setEntry] = useState(0);
  const [exit, setExit] = useState(0);
  const [lotSize, setLotSize] = useState(1);
  const [conversionRate, setConversionRate] = useState(280);
  const [showPopup, setShowPopup] = useState(false);

  const isJPYPair = pair.includes("JPY");
  const isGold = pair === "XAU/USD";

  const pipSize = isGold ? 0.1 : isJPYPair ? 0.01 : 0.0001;

  const pips = isGold
    ? Math.abs(exit - entry) / 0.1
    : isJPYPair
    ? Math.abs(exit - entry) / 0.01
    : Math.abs(exit - entry) / 0.0001;

  const getPipValue = () => {
    const [base, quote] = pair.split("/");
    const units = 100000;

    if (isGold) {
      return 1; // 1 pip = $1 per 0.1 movement
    }

    if (quote === "USD") {
      return 10; // e.g., EUR/USD
    } else if (base === "USD") {
      return (pipSize * units) / exit; // e.g., USD/JPY
    } else {
      return 10; // cross pairs approx
    }
  };

  const pipValue = getPipValue();
  const profitUSD = pips * pipValue * lotSize;
  const profitLocal = profitUSD * conversionRate;

  return (
    <div className="max-w-xl mx-auto p-6 bg-zinc-400 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-2 text-center">Forex Profit/Loss Calculator</h2>

      <div className="mb-2">
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

      <div className="mb-2">
        <label className="block font-medium mb-1">Entry Price</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={entry}
          onChange={(e) => setEntry(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-2">
        <label className="block font-medium mb-1">Exit Price</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={exit}
          onChange={(e) => setExit(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-2">
        <label className="block font-medium mb-1">Lot Size</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={lotSize}
          onChange={(e) => setLotSize(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium mb-1">Conversion Rate (USD to PKR)</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={conversionRate}
          onChange={(e) => setConversionRate(parseFloat(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-y-2 mb-3 bg-emerald-900 p-4 text-white rounded-xl">
        <div className="flex gap-2 justify-between items-center cursor-pointer">
          <p className="text-lg">Designer:</p>
          <h1 className="text-2xl font-bold self-center">Saqlain Asif</h1>
          <img
            className="h-10 w-10 rounded-full object-cover hover:scale-105 transition"
            src="public/my.PNG"
            alt="Designer Pic"
            onClick={() => setShowPopup(true)}
          />
        </div>

        <div className="flex justify-around text-3xl border bg-white rounded-lg p-2">
          <IoLogoWhatsapp onClick={() => window.open("https://wa.me/923147226841?text=Hi%20Saqlain%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!", "_blank")} className="cursor-pointer text-green-800 transition duration-200" />
          <FaFacebook onClick={() => window.open("https://web.facebook.com/Saqlain.Asif.26", "_blank")} className="cursor-pointer text-blue-800 transition duration-200" />
          <FaGithub onClick={() => window.open("https://github.com/Saqlain-Asif-26", "_blank")} className="cursor-pointer text-gray-800 transition duration-200" />
          <MdEmail onClick={() => window.open("mailto:rsaqlainasif26@gmail.com", "_blank")} className="cursor-pointer text-red-800 transition duration-200" />
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setShowPopup(false)}>
          <img
            src="public/my.PNG"
            alt="Saqlain Asif"
            className="w-[80%] max-w-lg rounded-xl shadow-2xl border-4 border-white"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="bg-gray-200 rounded-lg p-4">
        <p className="font-semibold">Total Pips: <span className="text-blue-600">{pips.toFixed(2)}</span></p>
        <p className="font-semibold">Profit/Loss (USD): <span className="text-green-600">${profitUSD.toFixed(2)}</span></p>
        <p className="font-semibold">Profit/Loss (PKR): <span className="text-green-600">Rs {profitLocal.toFixed(2)}</span></p>
      </div>
    </div>
  );
}
