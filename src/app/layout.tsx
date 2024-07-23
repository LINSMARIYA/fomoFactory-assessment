"use client";

import { Provider } from "react-redux";
import { store } from "./lib/store";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <div className="h-[100vh] w-[100vh] m-auto py-10 px-6 text-silver">
            {children}
          </div>
        </body>
      </html>
    </Provider>
  );
}
