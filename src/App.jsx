import React from "react";
import ForexProfitCalculator from "./components/ForexProfitCalculator";

function App() {
  return (
    <div className="h-screen w-screen overflow-x-hidden bg-zinc-900 flex items-center py-4">
      <ForexProfitCalculator className='px-12 mx-4' />
    </div>
  );
}

export default App;
