import useFetchSkills from "@/hooks/useFetchSkills";
import { SkillQueryDataType } from "@/models/skill-search";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

type SkillSearchType = {
  handleQuery: (data: SkillQueryDataType) => void;
};

type Skill = {
  id: string;
  name: string;
  subSkills: Skill[];
  certifications: any[];
};

type SkillOption = {
  value: string;
  label: string;
  certifications: any[];
};

type Option = {
  label: string;
  value: string;
};

export default function SkillSearch(props: SkillSearchType) {
  const session = useSession();
  const { handleQuery } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fetchSkillSwr = useFetchSkills(session, true, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const getSkillOptions = (skillOptions?: Skill[]) => {
    const arr: SkillOption[] = [];

    function getSkillTree(skillOptions: Skill[], arr: SkillOption[]) {
      skillOptions.forEach(({ id, name, subSkills, certifications }) => {
        arr.push({ value: id, label: name, certifications });

        if (subSkills?.length) {
          getSkillTree(subSkills, arr);
        }
      });
    }

    if (skillOptions) getSkillTree(skillOptions, arr);
    return arr;
  };

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

  const onChangeSelect = (e: Option, i: number) => {
    const keyword = e?.label ? e.label : "";
    setData((data) => {
      if (!data.keywords[i]) {
        (data.keywords as any)[i] = {
          keyword,
          mandatory: false,
        };
      } else {
        (data.keywords as any)[i].keyword = keyword;
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
    <div className="flex items-end">
      {Array.from(Array(3)).map((t, i) => (
        <React.Fragment key={i}>
          <div key={i} className="w-1/4">
            <Checkbox
              defaultChecked={(data as any)[i]?.mandatory}
              size="sm"
              name={"" + i}
              className="font-normal mb-1"
              isSelected={data.keywords[i]?.mandatory}
              onValueChange={(e) => onChangeCheckbox(i, e)}
            >
              Required
            </Checkbox>
            <CreatableSelect
              className="react-select-container w-full"
              classNamePrefix="react-select"
              isClearable
              placeholder="Skill name"
              value={{
                label: data.keywords[i]?.keyword,
                value: data.keywords[i]?.keyword,
              }}
              onChange={(e) => onChangeSelect(e as Option, i)}
              options={getSkillOptions(fetchSkillSwr.fetchSkills.data?.content)}
            />
          </div>

          <Spacer x={4} />
        </React.Fragment>
      ))}

      <Input
        type="text"
        classNames={{
          inputWrapper: "h-[34px]",
        }}
        placeholder="Enter department"
        isClearable={true}
        className="w-1/4"
        size="sm"
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
