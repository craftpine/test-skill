"use client";
import Section from "@/components/section";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableRow,
} from "@nextui-org/table";
import { TableHeader } from "@react-stately/table";
import { useSession } from "next-auth/react";
import {
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlineGroup,
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdOutlineWorkOutline } from "react-icons/md";
import dayjs from "dayjs";
import CONSTANTS from "@/constants";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { useDisclosure } from "@nextui-org/use-disclosure";
import DeleteModal from "./components/delete-modal";
import { Spinner } from "@nextui-org/spinner";
import { useState } from "react";
import axiosInstance from "@/libs/axiosinstance";
import { Input } from "@nextui-org/input";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Selection } from "@nextui-org/react";

import { AiOutlinePlus, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import CreateSkillModal, { NewSkill } from "./components/create-modal";
import useFetchSkills from "@/hooks/useFetchSkills";
import useGetSWR from "@/hooks/useGetSwr";
import { toast } from "react-toastify";

type SkillType = {
  certifications: any[];
  id: string;
  name: string;
  ratingScore: number;
  yearOfExperience: number;
};

export default function Page(props: any) {
  const deleteModalActions = useDisclosure({ id: "deleteModal" });

  const createModalActions = useDisclosure({ id: "createModal" });

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(["1", "2", "3", "4", "5"])
  );

  const [search, setSearch] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const session = useSession();

  const { data, error, isLoading, mutate } = useGetSWR({
    url:
      session.status == CONSTANTS.NEXT_AUTH_STATE.AUTHENTICATED
        ? // ? `/employees?email=${(session.data as any).email}`
          `/employees?email=dai.le1@cloudapps.vn`
        : undefined,
    options: {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  });

  const fetchSkillSwr = useFetchSkills(session);

  const [skill, setSkill] = useState<{ name: string; id: string }>({
    id: "",
    name: "",
  });

  const handleOpenAddNewSkill = () => {
    fetchSkillSwr.setShouldFetch(true);
    createModalActions.onOpen();
  };

  const modifySkill = async (postData: any, handleSuccess: () => void) => {
    try {
      setLoading(true);
      await axiosInstance.put(
        // `/employees/${(session.data as any).email}`,
        `/employees/dai.le1@cloudapps.vn`,
        postData
      );

      handleSuccess();
      mutate({ ...data, skills: postData });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error as string);
    }
  };

  const handleAddNewSkills = async (newSkills: NewSkill[]) => {
    const postData = [...data.skills];

    newSkills?.forEach((skill) => {
      postData.push({
        id: skill.id?.value,
        certifications: skill.id.certifications,
        ratingScore: skill.ratingScore?.value ? +skill.ratingScore?.value : 0,
        yearOfExperience: skill.yearOfExperience ? +skill.yearOfExperience : 0,
      });
    });

    await modifySkill(postData, () => {
      createModalActions.onClose();
      toast.success(
        `Add skills for ${(data as any).fullName} have been sucessfully!`
      );
    });
  };

  const handleDeleteSkill = async () => {
    const postData = [...data.skills].filter((t) => t.id !== skill.id);

    await modifySkill(postData, () => {
      deleteModalActions.onClose();
      toast.success(`Delete skill ${skill.name} sucessfully!`);
    });
  };

  console.log({ data, error, isLoading });

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  const getTableData = () => {
    const tableData = data?.skills.filter(
      (t: { ratingScore: number; name: string }) =>
        Array.from(visibleColumns).includes("" + t.ratingScore) &&
        t.name?.toLowerCase().includes(search.toLowerCase())
    );

    return tableData ?? [];
  };

  return (
    <>
      <DeleteModal
        isOpen={deleteModalActions.isOpen}
        onOpenChange={deleteModalActions.onOpenChange}
        skillName={skill.name}
        handleDeleteSkill={handleDeleteSkill}
        loading={loading}
      />

      <CreateSkillModal
        isOpen={createModalActions.isOpen}
        onOpenChange={createModalActions.onOpenChange}
        skillOptions={fetchSkillSwr.fetchSkills.data?.content}
        skillOptionsLoading={fetchSkillSwr.fetchSkills.isLoading}
        handleAddNewSkills={handleAddNewSkills}
        currentSkills={data?.skills}
        loading={loading}
      />

      <div className="flex gap-4 items-start">
        <Section delay={0.1}>
          <Card className="min-w-[340px] grid gap-3 p-4" isBlurred>
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src={data?.image} />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {data?.fullName}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    {data?.roleName}
                  </h5>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small">
              <ul className="grid gap-3 bg-anti-flash-white rounded-lg p-4">
                <li className="flex gap-4">
                  <span>
                    <AiOutlineCalendar size={20} />
                  </span>
                  <div className="grid">
                    <span className="text-sm text-default-400">Brithday</span>
                    <span>{dayjs(data?.birthday).format("DD-MM-YYYY")}</span>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span>
                    <AiOutlineMail size={20} />
                  </span>
                  <div className="grid">
                    <span className="text-sm text-default-400">Email</span>
                    <span>{data?.email}</span>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span>
                    <MdOutlineWorkOutline size={20} />
                  </span>
                  <div className="grid">
                    <span className="text-sm text-default-400">Job</span>
                    <span>
                      {" "}
                      {data?.overallLevel} - {data?.jobName}
                    </span>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span>
                    <AiOutlineGroup size={20} />
                  </span>
                  <div className="grid">
                    <span className="text-sm text-default-400">Department</span>
                    <span>{data?.departmentName}</span>
                  </div>
                </li>
              </ul>
            </CardBody>
            <CardFooter className="gap-3 grid">
              <div className="flex gap-1 flex-col">
                <p className="font-semibold text-default-400 text-small">
                  Update at ({dayjs(data?.lastUpdatedDate).format("DD-MM-YYYY")}
                  )
                </p>
                <p className=" text-default-400 text-small">
                  {data?.lastUpdatedByName}
                </p>
              </div>
              {/* <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">97.1K</p>
              <p className="text-default-400 text-small">{data?.lastUpdatedByName}</p>
            </div> */}
            </CardFooter>
          </Card>
        </Section>

        <Section delay={0.2} className="w-full">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Search by skill name..."
                startContent={<AiOutlineSearch />}
                // value={filterValue}
                // onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button
                      endContent={<AiOutlineDown className="text-small" />}
                      variant="flat"
                    >
                      Columns
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}
                  >
                    {CONSTANTS.SKILLS.map((column) => (
                      <DropdownItem key={column.id} className="capitalize">
                        {column.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                {/* open add new skill modal */}
                <Button
                  color="primary"
                  endContent={<AiOutlinePlus />}
                  onPress={handleOpenAddNewSkill}
                >
                  Add New
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-default-400 text-small">
              Total {getTableData().length || 0} skills
            </span>
          </div>

          <Table
            aria-label="Example static collection table"
            isStriped
            classNames={{
              table: `min-h-[100px]`,
            }}
          >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Skill</TableColumn>
              <TableColumn>Level</TableColumn>
              <TableColumn>EXPERIENCES</TableColumn>
              <TableColumn>CERTIFICATIONS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              loadingContent={<Spinner label="Loading..." />}
            >
              {getTableData().map((t: SkillType, i: number) => (
                <TableRow key={t.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>
                    <Chip
                      variant="flat"
                      color={
                        (CONSTANTS.SKILL_LEVEL_COLOR_MAPPING as any)[
                          t.ratingScore
                        ]
                      }
                    >
                      {(CONSTANTS.SKILL_LEVEL_MAPPING as any)[t.ratingScore]}
                    </Chip>
                  </TableCell>
                  <TableCell>{t.yearOfExperience}</TableCell>
                  <TableCell>
                    {t.certifications.length ? (
                      t.certifications.map((t) => (
                        <div key={t.id} className="flex flex-col">
                          <span className="text-sm">{t.name}</span>
                          <span className="text-bold text-xs capitalize text-default-400">
                            {t.description}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Tooltip content="Details">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <AiOutlineEye />
                        </span>
                      </Tooltip>
                      <Tooltip content="Edit skill">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <AiOutlineEdit />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete skill">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <AiOutlineDelete
                            onClick={() => {
                              setSkill(t);
                              deleteModalActions.onOpen();
                            }}
                          />
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>
      </div>
    </>
  );
}
