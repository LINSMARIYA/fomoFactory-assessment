import { NextResponse } from "next/server";

import dbConnect from "@/app/database/db";
import CoinDataModel from "@/app/models/coin";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const coinCode = url.searchParams.get("coinCode") || "";

    const data = await CoinDataModel.find({ code: coinCode })
      .sort({
        createdAt: -1,
      })
      .limit(20);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
