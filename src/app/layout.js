import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import ProviderRedux from "./store/ProviderRedux/ProviderRedux";
import { Suspense } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Красная цена",
  description: "Где будущее становится реальностью: электроника вашего выбора на расстоянии одного клика!",
  icons: [
    {
      rel: "icon",
      sizes: "any",
      url: "/img/iconka.png",
    },
  ],
};

export default function RootLayout({ children }) {
  const handleTouchMove = (event) => {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  };

  if (typeof window !== "undefined") {
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
  }
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <body className={`${inter.className}`}>
        <ProviderRedux>
          <Header />
          {children}
          <ScrollToTop />
        </ProviderRedux>
      </body>
    </html>
  );
}
