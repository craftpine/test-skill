"use client";

import CONSTANTS from "@/constants";
import useFetchRole from "@/hooks/useFetchRole";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Wrapper({ children }: any) {
  // const session = useSession();
  // const fetchRoleSwr = useFetchRole(session, true);

  // console.log(fetchRoleSwr.fetchRole.data);

  // if (fetchRoleSwr.fetchRole.data?.permission) {
  //   localStorage.setItem(
  //     CONSTANTS.PERMISSION,
  //     fetchRoleSwr.fetchRole.data.permission
  //   );
  // }

  return <>{children}</>;
}
