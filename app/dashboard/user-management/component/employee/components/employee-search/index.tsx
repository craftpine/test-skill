import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { EmployeeQueryDataType } from "@/models/skill-search";
import { isEmpty } from "lodash";

type EmployeeSearchType = {
  handleQuery: (data: EmployeeQueryDataType) => void;
};

export default function EmployeeSearch(props: EmployeeSearchType) {
  const { handleQuery } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<EmployeeQueryDataType>({});

  const submit = () => {
    let query = "";

    const tab = searchParams.get("tab");

    if (tab) query += `tab=${tab}`;

    if (data.department) query += `&department=${data.department}`;

    if (data.keyword) query += `&keyword=${data.keyword}`;

    router.push(`${pathname}?${query}`);

    handleQuery(data);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((data: EmployeeQueryDataType) => {
      if (value === "") {
        delete (data as any)[name];
      } else {
        (data as any)[name] = value;
      }
      return { ...data };
    });
  };

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab !== "employees") return;

    const department = searchParams.get("department");

    const keyword = searchParams.get("keyword");

    const employeeData = {
      ...data,
      ...(keyword && { keyword }),
      ...(department && { department }),
    };

    if (!isEmpty(employeeData)) {
      setData(employeeData);
      if (department || keyword) {
        handleQuery(employeeData);
      }
    }
  }, [searchParams.get("tab")]);

  return (
    <div className="flex items-center">
      <Input
        type="text"
        // label="Employee name or email"
        placeholder="Enter name or email"
        isClearable={true}
        className="w-1/4"
        name="keyword"
        onChange={onChange}
        defaultValue={data?.keyword}
        onClear={() =>
          setData((data) => {
            delete data.keyword;
            return { ...data };
          })
        }
      />
      <Spacer x={4} />

      <Input
        type="text"
        // label="Department"
        placeholder="Enter department"
        isClearable={true}
        className="w-1/4"
        name="department"
        onChange={onChange}
        defaultValue={data?.department}
        onClear={() =>
          setData((data) => {
            delete data.department;
            return { ...data };
          })
        }
      />
      <Spacer x={4} />

      <Button color="primary" onClick={submit} isDisabled={isEmpty(data)}>
        Search
      </Button>
    </div>
  );
}
