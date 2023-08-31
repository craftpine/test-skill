"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useEffect, useState } from "react";

import { LiaCertificateSolid } from "react-icons/lia";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiFamilyTree } from "react-icons/gi";
import Section from "@/components/section";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Skill from "./component/skill";
import Cert from "./component/cert";
import Employee from "./component/employee";

const TABS = [
  {
    title: (
      <div className="flex items-center space-x-2">
        <GiFamilyTree />
        <span>Skill</span>
      </div>
    ),
    key: "skills",
    component: <Skill />,
  },
  {
    title: (
      <div className="flex items-center space-x-2">
        <LiaCertificateSolid />
        <span>Certification</span>
      </div>
    ),
    key: "certifications",
    component: <Cert />,
  },
  {
    title: (
      <div className="flex items-center space-x-2">
        <AiOutlineUsergroupAdd />
        <span>Employee</span>
      </div>
    ),
    key: "employees",
    component: <Employee />,
  },
];

export default function Page() {
  const [selected, setSelected] = useState("skills");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: any) => {
    router.push(`${pathname}?tab=${e}`);

    setSelected(e);
  };

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelected(tab);
    }
  }, []);

  return (
    <Section delay={0.1} className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={handleChange}
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-han-purple",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-han-purple",
        }}
      >
        {TABS.map((tab, i) => (
          <Tab key={tab.key} title={tab.title}>
            <Card>
              <CardBody>{tab.component}</CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </Section>
  );
}
