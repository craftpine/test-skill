import Breadcrumb from "@/components/breadcrumb";
import Section from "@/components/section";
import SideBar from "@/components/sidebar";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <SideBar />
      <div className="p-4 grow-[1] w-[calc(100vw-240px)]">
        <Section delay={0.1}>
          <Breadcrumb />
        </Section>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}
