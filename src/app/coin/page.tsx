import React from "react";

import CoinListPage from "@/modules/coin/coinListPage";

const page = () => {
  return (
    <div className="h-full flex flex-col items-center gap-5">
      <div className="text-silver text-[28px] font-medium leading-8 text-left flex justify-center">{`Cryptocurrency Prices Live`}</div>
      <div className="text-silver text-xl font-medium leading-8 text-left flex justify-center">{`Top Coins by Market Cap`}</div>
      <CoinListPage />
    </div>
  );
};

export default page;
