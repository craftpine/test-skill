import Section from "@/components/section";
import { Divider } from "@nextui-org/divider";
import { Spacer } from "@nextui-org/spacer";
import SkillSearch from "./components/skill-search";
import SkillTable from "./components/skill-table";
import { useState } from "react";
import { SkillQueryDataType, SkillType } from "@/models/skill-search";
import axiosInstance, { updateToken } from "@/libs/axiosinstance";
import { useSession } from "next-auth/react";
import usePostRequest from "@/hooks/usePost";

type SkillState = {
  content: SkillType[];
};

export default function Skill() {
  const { data } = useSession();

  const [skills, setSkill] = useState<SkillState>({
    content: [],
  });

  const { fetcher } = usePostRequest({
    url: "/employees/skills-search",
    type: "post",
  });

  const handleQuerySkills = async (postData: SkillQueryDataType) => {
    try {
      const response = await fetcher(postData);
      setSkill(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Section delay={0.2}>
        <SkillSearch handleQuery={handleQuerySkills} />
      </Section>

      <Spacer y={6} />

      <Section delay={0.3}>
        <Divider />
      </Section>

      <Spacer y={6} />

      <Section delay={0.4}>
        <SkillTable querySkills={skills} />
      </Section>
    </>
  );
}
