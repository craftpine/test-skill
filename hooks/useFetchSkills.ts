import CONSTANTS from "@/constants";
import { useState } from "react";
import useGetSWR from "./useGetSwr";

export default function useFetchSkills(
  session: any,
  defaultShouldFetch: boolean = false,
  options: any = null
) {
  const [shouldFetch, setShouldFetch] = useState<boolean>(defaultShouldFetch);

  const fetchSkills = useGetSWR({
    url:
      session.status == CONSTANTS.NEXT_AUTH_STATE.AUTHENTICATED && shouldFetch
        ? "/master/skills"
        : undefined,
    options,
  });

  return { fetchSkills, setShouldFetch };
}
