import CONSTANTS from "@/constants";
import { useState } from "react";
import useGetSWR from "./useGetSwr";

export default function useFetchSkills(session: any) {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const fetchSkills = useGetSWR({
    url:
      session.status == CONSTANTS.NEXT_AUTH_STATE.AUTHENTICATED && shouldFetch
        ? "/master/skills"
        : undefined,
  });

  return { fetchSkills, setShouldFetch };
}
