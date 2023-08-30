"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useEffect, useMemo, useState } from "react";

import { LiaCertificateSolid } from "react-icons/lia";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiFamilyTree } from "react-icons/gi";
import SkillSearch from "./component/skill-search";
import SkillTable from "./component/skill-table";
import { Divider } from "@nextui-org/divider";
import { Spacer } from "@nextui-org/spacer";
import CertSearch from "./component/cert-search";
import EmployeeeSearch from "./component/employee-search";
import Section from "@/components/section";
import {
  CertQueryDataType,
  EmployeeQueryDataType,
  SkillQueryDataType,
} from "@/models/skill-search";
import CertTable from "./component/cert-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EmployeeTable from "./component/employee-table";
import { useSession } from "next-auth/react";
import axiosInstance, { updateToken } from "@/libs/axiosinstance";

const TABS = [
  {
    title: (
      <div className="flex items-center space-x-2">
        <GiFamilyTree />
        <span>Skill</span>
      </div>
    ),
    key: "skills",
    searchContent: (props: {
      handleQuery: (data: SkillQueryDataType) => void;
    }) => <SkillSearch {...props} />,
    searchTable: (props: { querySkills: any }) => <SkillTable {...props} />,
  },
  {
    title: (
      <div className="flex items-center space-x-2">
        <LiaCertificateSolid />
        <span>Certification</span>
      </div>
    ),
    key: "certifications",
    searchContent: (props: {
      handleQuery: (data: CertQueryDataType) => void;
    }) => <CertSearch {...props} />,
    searchTable: (props: { querySkills: any }) => <CertTable {...props} />,
  },
  {
    title: (
      <div className="flex items-center space-x-2">
        <AiOutlineUsergroupAdd />
        <span>Employee</span>
      </div>
    ),
    key: "employees",
    searchContent: (props: {
      handleQuery: (data: EmployeeQueryDataType) => void;
    }) => <EmployeeeSearch {...props} />,
    searchTable: (props: { querySkills: any }) => <EmployeeTable {...props} />,
  },
];

export default function Page() {
  const { data, status, update } = useSession();

  const [selected, setSelected] = useState("skills");

  const [skills, setSkill] = useState([]);

  const [certifications, setCert] = useState([]);

  const [employees, setEmployee] = useState([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: any) => {
    router.push(`${pathname}?tab=${e}`);

    setSelected(e);
  };

  const handleQueryCerts = async (postData: SkillQueryDataType) => {
    try {
      updateToken((data as any)?.idToken);

      const response = await axiosInstance.post(
        "/employees/certs-search",
        postData
      );
      setCert(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleQuerySkills = async (postData: SkillQueryDataType) => {
    try {
      updateToken((data as any)?.idToken);

      const response = await axiosInstance.post(
        "/employees/skills-search",
        postData
      );
      setSkill(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleQueryEmployees = async (postData: SkillQueryDataType) => {
    try {
      updateToken((data as any)?.idToken);

      const response = await axiosInstance.get("/employees/opms", {
        params: postData,
      });
      setEmployee(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleQuery = useMemo(() => {
    const obj: any = {
      skills: handleQuerySkills,
      certifications: handleQueryCerts,
      employees: handleQueryEmployees,
    };

    return obj[selected as any];
  }, [selected]);

  const querySkills = useMemo(() => {
    const obj: any = {
      skills: skills,
      certifications: certifications,
      employees: employees,
    };

    return obj[selected as any];
  }, [selected, skills, certifications, employees]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    console.log(tab);
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
              <CardBody>
                {/* <Section delay={0.2}>{tab.searchContent}</Section> */}
                <Section delay={0.2}>
                  {tab.searchContent({ handleQuery })}
                </Section>

                <Spacer y={6} />

                <Section delay={0.3}>
                  <Divider />
                </Section>

                <Spacer y={6} />

                <Section delay={0.4}>
                  {tab.searchTable({ querySkills })}
                </Section>
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </Section>
  );
}
