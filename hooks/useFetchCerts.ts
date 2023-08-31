import CONSTANTS from "@/constants";
import { useState } from "react";
import useGetSWR from "./useGetSwr";

export default function useFetchCerts(
  session: any,
  defaultShouldFetch: boolean = false,
  options: any = null
) {
  const [shouldFetch, setShouldFetch] = useState<boolean>(defaultShouldFetch);

  const fetchCerts = useGetSWR({
    url:
      session.status == CONSTANTS.NEXT_AUTH_STATE.AUTHENTICATED && shouldFetch
        ? "/master/certs"
        : undefined,
    options,
  });

  return { fetchCerts, setShouldFetch };
}
