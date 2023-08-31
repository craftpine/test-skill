"use client";
import LoadingScreen from "@/components/loading-screen";
import CONSTANTS from "@/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthenticatedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function AuthenticatedRoute({
  allowedRoles,
  children,
}: AuthenticatedRouteProps) {
  const session = useSession();
  const router = useRouter();

  if (session.status === CONSTANTS.NEXT_AUTH_STATE.LOADING) {
    // Redirect to login if not authenticated
    return <LoadingScreen />;
  }

  if (session.status === CONSTANTS.NEXT_AUTH_STATE.UNAUTHENTICATED) {
    // Redirect to login if not authenticated
    router.push("/");
    return null;
  }

  const userRoles: string[] = [(session.data as any)?.permission]; // Retrieve user roles from session

  //   console.log(userRoles, allowedRoles);
  if (!userRoles.some((role) => allowedRoles.includes(role))) {
    // Redirect to unauthorized page if user doesn't have required roles
    router.push("/unauthorized");
    return null;
  }

  // Render the children if authorized
  return <>{children}</>;
}
