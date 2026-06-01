import Head from "@/layout/componets/Head";
import Footer from "@/layout/componets/Footer";
import { ToastProvider } from "@/components/Toast";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") return null;
  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={(pageProps as any).session}>
      <ToastProvider>
        <Head />
        <AuthGate>
          <Component {...pageProps} />
        </AuthGate>
        <Footer />
      </ToastProvider>
    </SessionProvider>
  );
}
