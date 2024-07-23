import { NextResponse } from "next/server";
import dbConnect from "@/app/database/db";
import CoinDataModel from "@/app/models/coin";
import selectedCoin from "@/app/models/selectedCoin";

export async function GET() {
  const POLLING_INTERVAL = 100;
  const MAX_ENTRIES = 19;
  const coinCodeArray = ["ETH", "BTC", "SOL", "USDC", "DOGE"];
  const coinListNames = [
    "Bitcoin",
    "Ethereum",
    "Solana",
    "USD Coin",
    "Dogecoin",
  ];
  const fetchCoinData = async () => {
    await dbConnect();

    const res = await fetch(
      new Request("https://api.livecoinwatch.com/coins/map"),
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "eb3b10c7-1b3f-4c88-b41d-65254f23c678",
        }),
        body: JSON.stringify({
          codes: coinCodeArray,
          currency: "USD",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 0,
          meta: false,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    return res.json();
  };

  const pollAndSaveDate = async () => {
    try {
      await dbConnect();
      const selected = await selectedCoin.findOne().sort({ createdAt: -1 });

      const desiredCoins = await fetchCoinData();

      desiredCoins.forEach((item: any) => {
        const { volume, rate, cap, code } = item;
        const newCoin = {
          code: code,
          volume: volume,
          rate: rate,
          cap: cap,
        };

        const coin = new CoinDataModel(newCoin);
        coin.save();
      });
      for (let cName of coinCodeArray) {
        const totalEntries = await CoinDataModel.find({
          name: cName,
        }).countDocuments();

        if (totalEntries > MAX_ENTRIES) {
          // Find and delete the oldest entries
          const oldestEntries = await CoinDataModel.find({
            name: cName,
          })
            .sort({ createdAt: 1 })
            .limit(totalEntries - MAX_ENTRIES);
          const oldestEntryIds = oldestEntries.map((entry) => entry._id);
          await CoinDataModel.deleteMany({ _id: { $in: oldestEntryIds } });
        }
      }
    } catch (error) {
      return NextResponse.json(
        { status: 500 },
        { statusText: "Coin data fetch error" }
      );
    }
  };

  setInterval(() => {
    pollAndSaveDate();
  }, POLLING_INTERVAL);

  return NextResponse.json(
    { status: 200 },
    { statusText: "Coin data fetched" }
  );
}
