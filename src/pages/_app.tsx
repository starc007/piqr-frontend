import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { usePageLoading } from "@hooks/usePageLoading";
import { Loader } from "@components/Loader";

const MonaSans = localFont({
  src: [
    {
      path: "../../public/fonts/MonaSans-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/MonaSans-Bold.ttf",
      style: "bold",
      weight: "700",
    },
    {
      path: "../../public/fonts/MonaSans-Medium.ttf",
      style: "medium",
      weight: "500",
    },

    {
      path: "../../public/fonts/MonaSans-Light.ttf",
      style: "light",
      weight: "300",
    },
  ],
  variable: "--font-monaSans",
});

export default function App({ Component, pageProps }: AppProps) {
  const prod = process.env.NODE_ENV === "production";

  const { isPageLoading } = usePageLoading();

  return (
    <main className={MonaSans.variable}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-R39XVX2RVZ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive" async>
        {`
          if (${prod}) {
            window.dataLayer = window.dataLayer || [];
             function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R39XVX2RVZ');
          }
        `}
      </Script>
      <Toaster
        position="top-center"
        containerClassName="text-sm text-gray-700 font-medium font-poppins"
      />
      {/* {isPageLoading ? (
        <div className="flex justify-center mt-10">
          <Loader col="text-dark" />
        </div>
      ) : (
        <Component {...pageProps} />
      )} */}
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}
