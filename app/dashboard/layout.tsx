import AuthenticatedRoute from "@/HOC/withAuthorization";
import Breadcrumb from "@/components/breadcrumb";
import Section from "@/components/section";
import SideBar from "@/components/sidebar";
import CONSTANTS from "@/constants";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthenticatedRoute
      allowedRoles={[
        CONSTANTS.PERMISSIONS.ADMIN,
        CONSTANTS.PERMISSIONS.WRITE,
        CONSTANTS.PERMISSIONS.BASIC,
        CONSTANTS.PERMISSIONS.READ,
      ]}
    >
      <div className="flex">
        <SideBar />
        <div className="p-4 grow-[1] w-full md:w-[calc(100vw-240px)]">
          <Section delay={0.1}>
            <Breadcrumb />
          </Section>
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </AuthenticatedRoute>
  );
}
