import Section from "@/components/section";
import { Divider } from "@nextui-org/divider";
import { Spacer } from "@nextui-org/spacer";
import EmployeeTable from "./components/employee-table";
import EmployeeSearch from "./components/employee-search";
import {
  EmployeeQueryDataType,
  SkillQueryDataType,
} from "@/models/skill-search";
import axiosInstance, { updateToken } from "@/libs/axiosinstance";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useFetchEmployees from "@/hooks/useFetchEmployee";

export default function Employee() {
  const session = useSession();

  const [employees, setEmployee] = useState();

  const [postData, setPostData] = useState<any>();

  const fetchEmployeeSwr = useFetchEmployees({
    session,
    params: postData,
  });

  console.log("employee", fetchEmployeeSwr.fetchEmployees)

  const handleQueryEmployees = async (postData: EmployeeQueryDataType) => {
    setPostData(postData);
    fetchEmployeeSwr.setShouldFetch(true);
  };

  return (
    <>
      <Section delay={0.2}>
        <EmployeeSearch handleQuery={handleQueryEmployees} />
      </Section>
      <Spacer y={6} />
      <Section delay={0.3}>
        <Divider />
      </Section>
      <Spacer y={6} />
      <Section delay={0.4}>
        <EmployeeTable querySkills={fetchEmployeeSwr.fetchEmployees.data as any} />
      </Section>
    </>
  );
}
