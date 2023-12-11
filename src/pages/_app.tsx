import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  const prod = process.env.NODE_ENV === "production";

  return (
    <>
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
      <Component {...pageProps} />
    </>
  );
}
