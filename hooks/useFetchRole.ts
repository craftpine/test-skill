import CONSTANTS from "@/constants";
import { useState } from "react";
import useGetSWR from "./useGetSwr";

export default function useFetchRole(
  session: any,
  defaultShouldFetch: boolean = false,
  options: any = null
) {
  const [shouldFetch, setShouldFetch] = useState<boolean>(defaultShouldFetch);

  const fetchRole = useGetSWR({
    url:
      session.status == CONSTANTS.NEXT_AUTH_STATE.AUTHENTICATED && shouldFetch
        ? `/user/permissions/${session.data.email}`
        : undefined,
    options,
  });

  return { fetchRole, setShouldFetch };
}
