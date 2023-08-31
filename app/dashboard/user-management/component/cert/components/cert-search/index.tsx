import useFetchCerts from "@/hooks/useFetchCerts";
import { CertQueryDataType, MasterCertType } from "@/models/skill-search";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

type CertSearchType = {
  handleQuery: (data: CertQueryDataType) => void;
};

type Option = {
  label: string;
  value: string;
};

export default function CertSearch(props: CertSearchType) {
  const { handleQuery } = props;

  const session = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<CertQueryDataType>({
    departmentName: "",
    keywords: [],
  });

  const fetchCertSwr = useFetchCerts(session, true, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const submit = () => {
    const params = new URLSearchParams();

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

    setData((data: CertQueryDataType) => {
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

  const getSkillOptions = (skillOptions?: MasterCertType[]) => {
    if (!skillOptions) return [];
    return skillOptions.map((t) => ({
      value: t.id,
      label: t.name,
      description: t.description,
    }));
  };

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab !== "certifications") return;

    const departmentName = searchParams.get("departmentName");

    const keywords: any = searchParams.get("keywords")
      ? JSON.parse(searchParams.get("keywords") ?? "")
      : "";

    const skilData = {
      ...data,
      ...(keywords && { keywords }),
      ...(departmentName && { departmentName }),
    };

    setData(skilData);

    if (departmentName || keywords) {
      handleQuery(skilData);
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
              options={getSkillOptions(fetchCertSwr.fetchCerts.data?.content)}
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
        name="departmentName"
        defaultValue={data.departmentName}
        onClear={() => setData((data) => ({ ...data, department: undefined }))}
      />
      <Spacer x={4} />

      <Button color="primary" onClick={submit} isDisabled={isEmpty(data)}>
        Search
      </Button>
    </div>
  );
}
