import { NextResponse } from "next/server";

import dbConnect from "@/app/database/db";
import selectedCoin from "@/app/models/selectedCoin";

export async function POST(req: Request) {
  //   const url = new URL(req.url);
  //   const coinName = url.searchParams.get("coinName") || "";
  const { name, code } = await req.json();

  if (!name || !code) {
    return NextResponse.json({
      status: 400,
      message: "Missing coin name or code",
    });
  }

  try {
    await dbConnect();

    await selectedCoin.findOneAndUpdate(
      {},
      { name, code },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      status: 200,
      message: "Selected coin saved successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
