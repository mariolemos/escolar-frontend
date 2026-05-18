import Head from "@/layout/componets/Head";
import Footer from "@/layout/componets/Footer";
import { ToastProvider } from "@/components/Toast";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Head />
      <Component {...pageProps} />
      <Footer />
    </ToastProvider>
  );
}
