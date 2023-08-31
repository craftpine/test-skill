import { Divider } from "@nextui-org/divider";
import { Spacer } from "@nextui-org/spacer";
import CertTable from "./components/cert-table";
import CertSearch from "./components/cert-search";
import Section from "@/components/section";
import { useState } from "react";
import { CertType, SkillQueryDataType } from "@/models/skill-search";
import { useSession } from "next-auth/react";
import usePostRequest from "@/hooks/usePost";

type CertState = {
  content: CertType[];
};

export default function Cert() {
  const { data } = useSession();

  const [certifications, setCert] = useState<CertState>({
    content: [],
  });

  const { fetcher } = usePostRequest({
    url: "/employees/certs-search",
    type: "post",
  });

  const handleQueryCerts = async (postData: SkillQueryDataType) => {
    try {
      const response = await fetcher(postData);
      setCert(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Section delay={0.2}>
        <CertSearch handleQuery={handleQueryCerts} />
      </Section>

      <Spacer y={6} />

      <Section delay={0.3}>
        <Divider />
      </Section>

      <Spacer y={6} />

      <Section delay={0.4}>
        <CertTable querySkills={certifications} />
      </Section>
    </>
  );
}
