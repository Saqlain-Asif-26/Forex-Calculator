import React from "react";
import ForexProfitCalculator from "./components/ForexProfitCalculator";

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-900 overflow-x-hidden">
      <div className="p-2">
        <ForexProfitCalculator className='' />
      </div>
    </div>
  );
}

export default App;
