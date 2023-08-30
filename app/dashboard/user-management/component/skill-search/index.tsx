import { SkillQueryDataType } from "@/models/skill-search";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { cloneDeep } from "lodash";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type SkillSearchType = {
  handleQuery: (data: SkillQueryDataType) => void;
};

export default function SkillSearch(props: SkillSearchType) {
  const { handleQuery } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<SkillQueryDataType>({
    departmentName: "",
    keywords: [],
  });

  const submit = () => {
    let query = "";
    const tab = searchParams.get("tab");

    if (tab) query += `tab=${tab}`;

    if (data.departmentName) query += `&departmentName=${data.departmentName}`;

    if (data.keywords) query += `&keywords=${JSON.stringify(data.keywords)}`;

    router.push(`${pathname}?${query}`);
    handleQuery(data);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    setData((data: SkillQueryDataType) => {
      if (name === "departmentName") {
        data.departmentName = value;
      } else {
        if (!(data.keywords as any)[name]) {
          (data.keywords as any)[name] = {
            keyword: "",
            mandatory: checked,
          };
        }
        (data.keywords as any)[name].keyword = value;
      }

      return { ...data };
    });
  };

  const onChangeCheckbox = (i: number, e: Boolean) => {
    setData((data) => {
      if (!data.keywords[i]) {
        (data.keywords as any)[i] = {
          keyword: "",
          mandatory: e,
        };
      } else {
        (data.keywords as any)[i].mandatory = e;
      }

      return { ...data };
    });
  };

  useEffect(() => {
    const tab = searchParams.get("tab") ?? "";

    if (["certifications", "employees"].includes(tab)) return;

    const departmentName = searchParams.get("departmentName");

    const keywords: any = searchParams.get("keywords")
      ? JSON.parse(searchParams.get("keywords") ?? "")
      : null;

    const skillData = {
      ...data,
      ...(keywords && { keywords }),
      ...(departmentName && { departmentName }),
    };

    setData(skillData);

    if (departmentName || keywords) {
      handleQuery(skillData);
    }
  }, [searchParams.get("tab")]);

  return (
    <div className="flex items-center">
      {Array.from(Array(3)).map((t, i) => (
        <React.Fragment key={i}>
          <div key={i} className="w-1/4">
            <Input
              type="text"
              label={
                <Checkbox
                  defaultChecked={(data as any)[i]?.mandatory}
                  size="sm"
                  name={"" + i}
                  className="font-normal"
                  isSelected={data.keywords[i]?.mandatory}
                  onValueChange={(e) => onChangeCheckbox(i, e)}
                >
                  Required
                </Checkbox>
              }
              name={"" + i}
              placeholder="Enter skill"
              isClearable={true}
              onChange={onChange}
              defaultValue={data.keywords[i]?.keyword}
              onClear={() =>
                setData((data) => {
                  data.keywords[i].keyword = "";
                  return { ...data };
                })
              }
            />
          </div>

          <Spacer x={4} />
        </React.Fragment>
      ))}

      <Input
        type="text"
        label="Department"
        placeholder="Enter department"
        isClearable={true}
        className="w-1/4"
        name="departmentName"
        defaultValue={data.departmentName}
        onChange={onChange}
        onClear={() => setData((data) => ({ ...data, department: undefined }))}
      />
      <Spacer x={4} />

      <Button color="primary" onClick={submit}>
        Search
      </Button>
    </div>
  );
}
