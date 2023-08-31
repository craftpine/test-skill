import CONSTANTS from "@/constants";
import { useState } from "react";
import useGetSWR from "./useGetSwr";

type UseFetchEmployee = {
  session: any;
  defaultShouldFetch?: boolean;
  options?: any;
  params?: any;
};

export default function useFetchEmployees({
  session,
  defaultShouldFetch = false,
  options = null,
  params = null,
}: UseFetchEmployee) {
  console.log(params);

  const getParams = () => {
    let query = "?";
    if (!params) return "";
    for (let [key, value] of Object.entries(params)) {
      query += `${key}=${value}&`;
    }

    return query.slice(0, -1);
  };

  const [shouldFetch, setShouldFetch] = useState<boolean>(defaultShouldFetch);

  const fetchEmployees = useGetSWR({
    url:
      session.status == CONSTANTS.NEXT_AUTH_STATE.AUTHENTICATED && shouldFetch
        ? `/employees/opms${getParams()}`
        : undefined,
    options,
  });

  return { fetchEmployees, setShouldFetch };
}
