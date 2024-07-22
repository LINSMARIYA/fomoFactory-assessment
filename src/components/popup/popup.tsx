"use client";

import React, { FC, useState } from "react";

interface Option {
  name: string;
  code: string;
}

interface PopupProps {
  options: Option[];
  onClose: () => void;
  onSelect: (option: Option) => void;
  defaultValue: string;
}

const Popup: FC<PopupProps> = ({
  options,
  onClose,
  onSelect,
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    () => options.find((option) => option.code === defaultValue) || null
  );

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onSelect(selectedOption);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto w-[325px]">
        <h2 className="text-xl font-bold mb-4 text-black">Select an Option</h2>
        <ul className="space-y-2 mb-4">
          {options.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => handleSelect(option)}
                className={`block ${
                  selectedOption?.name === option.name ? "bg-slate-400" : ""
                } w-full text-left text-primaryBlue p-2 rounded-md hover:bg-gray-200`}
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className={`w-full py-2 px-4 rounded-md text-white ${
            selectedOption
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full py-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
