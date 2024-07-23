"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Headings } from "@/components/table/type";
import {
  fetchData,
  saveSelectedCoin,
  updateBackendData,
} from "@/service/coinApi";
import Table from "@/components/table/table";
import Popup from "@/components/popup/popup";
import { setData } from "@/app/lib/tableReducer";
import { RootState } from "@/app/lib/rootReducer";

const headings: Headings = ["volume", "rate", "cap"];

type Option = {
  name: string;
  code: string;
};

type CoinData = {
  name: string;
  symbol: string;
  volume: number;
  rate: number;
  cap: number;
  liquidity: number;
};

const CoinListPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<CoinData[]>([]);
  // const tableData = useSelector((state: RootState) => state.table.data) || [];
  // const tableData = [];
  const options: Option[] = [
    { name: "Bitcoin", code: "BTC" },
    { name: "Ethereum", code: "ETH" },
    { name: "Solana", code: "SOL" },
    { name: "USD Coin", code: "USDC" },
    { name: "Dogecoin", code: "DOGE" },
  ];

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOptionSelect = async (selectedOption: Option) => {
    localStorage.setItem("selectedCoinCode", selectedOption.code);
    localStorage.setItem("selectedCoinName", selectedOption.name);
    await saveSelectedCoin(selectedOption.name, selectedOption.code);

    updateBackendData();
  };

  const selectedCoinCode = localStorage.getItem("selectedCoinCode") || "";

  useEffect(() => {
    fetchData(selectedCoinCode);
    const interval = setInterval(() => {
      (async () => {
        const res = await fetchData(selectedCoinCode);
        dispatch(setData(res));
        setTableData(res);
      })();
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedCoinCode]);

  useEffect(() => {
    localStorage.setItem("selectedCoinCode", "ETC");
    localStorage.setItem("selectedCoinName", "Ethereum");
    (async () => {
      await updateBackendData();
      const res = await fetchData(selectedCoinCode);
      setTableData(res);
      dispatch(setData(res));
    })();
  }, []);

  return (
    <div className="my-10">
      <h1 className="font-medium text-xl text-center w-full">
        {localStorage.getItem("selectedCoinName")}
      </h1>
      <div className="my-4 w-full">
        <button
          onClick={handleOpenPopup}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Change Coin
        </button>
      </div>

      {!!tableData?.length ? (
        <div className="pt-10 w-full h-full">
          <Table headings={headings} data={tableData} />
        </div>
      ) : (
        <></>
      )}

      {isPopupOpen && (
        <Popup
          defaultValue={localStorage.getItem("selectedCoinCode") || "ETH"}
          options={options}
          onClose={handleClosePopup}
          onSelect={handleOptionSelect}
        />
      )}
    </div>
  );
};

export default CoinListPage;
