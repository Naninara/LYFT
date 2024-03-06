import { Inter } from "next/font/google";
import Navbar from "./Components/Navbar";
import "./globals.css";

import NextAuthProvider from "./Components/SessionProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LYFT",
  description: "Your Pick Of Rides At Low Prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          {children}
          <Toaster position="top-center" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
