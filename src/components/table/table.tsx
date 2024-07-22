import React, { FC } from "react";
import { TableProps } from "./type";

const Table: FC<TableProps> = ({ headings, data }) => {
  console.log(data);
  return (
    <div className="bg-[#293143] rounded-md p-4">
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th style={{ padding: "8px", textAlign: "left" }}>SI</th>
            {headings.map((heading, index) => (
              <th key={index} style={{ padding: "8px", textAlign: "left" }}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{rowIndex + 1}</td>
              {headings.map((heading, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  style={{ padding: "8px", textAlign: "left" }}
                >
                  {row[heading]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
