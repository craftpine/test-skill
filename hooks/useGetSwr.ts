// useAuthenticatedSWR.js
import useSWR from "swr";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import axiosInstance from "@/libs/axiosinstance";
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      } as any);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      idToken: refreshedTokens.id_token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const fetcher = async (url: string) => {
  const session = await getSession();
  try {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${
      (session as any).idToken
    }`;

    const response = await axiosInstance.get(`${url}`);

    return response.data;
  } catch  (error: any) {
    if (error.response && error.response.status === 401) {
      await signOut();

      // TODO: ! need update before
      window.location.href = "/"
    }
    throw error;
  }
};

type useGetSWR = {
  url?: string;
  options?: any;
};

function useGetSWR({ url, options = {} }: useGetSWR) {
  return useSWR(url ? url : null, fetcher, options);
}

export default useGetSWR;
