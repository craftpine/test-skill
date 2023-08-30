"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode, useEffect } from "react";
// pages/_app.js
import { SessionProvider } from "next-auth/react";
import Fonts from "@/components/font";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }: any) {
  return (
    <>
      <Fonts />
      <ToastContainer />
      <SessionProvider
        // Re-fetch session every 5 minutes
        refetchInterval={5 * 60}
        // Re-fetches session when window is focused
        refetchOnWindowFocus={true}
      >
        <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>
    </>
  );
}
