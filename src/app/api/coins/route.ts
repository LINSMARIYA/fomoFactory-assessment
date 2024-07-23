import { NextResponse } from "next/server";
import dbConnect from "@/app/database/db";
import CoinDataModel from "@/app/models/coin";
import selectedCoin from "@/app/models/selectedCoin";

export async function GET() {
  const POLLING_INTERVAL = 5000;
  const MAX_ENTRIES = 19;
  const coinCodeArray = ["ETH", "BTC", "SOL", "USDC", "DOGE"];
  const fetchCoinData = async (coinCode: string) => {
    await dbConnect();

    const res = await fetch(
      new Request("https://api.livecoinwatch.com/coins/single"),
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "eb3b10c7-1b3f-4c88-b41d-65254f23c678",
        }),
        body: JSON.stringify({
          currency: "USD",
          code: coinCode,
          meta: true,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    return res.json();
  };

  const pollAndSaveDate = async (coinCode: string) => {
    try {
      await dbConnect();
      const selected = await selectedCoin.findOne().sort({ createdAt: -1 });

      const data = await fetchCoinData(coinCode);
      const { name, symbol, volume, rate, cap, liquidity } = data;
      const newCoin = {
        name: name,
        symbol: symbol,
        volume: volume,
        rate: rate,
        cap: cap,
        liquidity: liquidity,
      };
      console.log(newCoin.name);
      const coin = new CoinDataModel(newCoin);
      await coin.save();

      const totalEntries = await CoinDataModel.find({
        name: selected.name,
      }).countDocuments();

      if (totalEntries > MAX_ENTRIES) {
        // Find and delete the oldest entries
        const oldestEntries = await CoinDataModel.find({
          name: selected.name,
        })
          .sort({ createdAt: 1 })
          .limit(totalEntries - MAX_ENTRIES);
        const oldestEntryIds = oldestEntries.map((entry) => entry._id);
        await CoinDataModel.deleteMany({ _id: { $in: oldestEntryIds } });
      }
    } catch (error) {
      return NextResponse.json(
        { status: 500 },
        { statusText: "Coin data fetched" }
      );
    }
  };
  const callData = async () => {
    for (let i = 0; i < coinCodeArray.length; i++) {
      await pollAndSaveDate(coinCodeArray[i]);
    }
  };

  setInterval(async () => {
    console.log("coinDB");
    callData;
  }, POLLING_INTERVAL);

  return NextResponse.json({ status: 200 });
}
