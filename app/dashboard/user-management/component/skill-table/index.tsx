import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import dayjs from "dayjs";

type SkillType = {
  id: string;
  birthday: string;
  fullName: string;
  departmentName: string;
  skills: any[];
  email: string;
};

type SkillTableType = {
  querySkills: {
    content: SkillType[];
  };
};

export default function SkillTable(props: SkillTableType) {
  const { querySkills } = props;

  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <span className="text-default-400 text-small">
          Total {querySkills?.content?.length} users
        </span>
      </div>
      <Table
        aria-label="Example static collection table"
        removeWrapper
        isHeaderSticky
        classNames={{
          base: "max-h-[520px] overflow-scroll",
        //   table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Full name</TableColumn>
          <TableColumn>Year of birth</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Skills</TableColumn>
          <TableColumn>Department</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {querySkills?.content?.map((t: SkillType, i: number) => (
            <TableRow key={t.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{t.fullName}</TableCell>
              <TableCell>{dayjs(t.birthday).format("YYYY")}</TableCell>
              <TableCell>{t.email}</TableCell>
              <TableCell>
                {t.skills.map((skill) => (
                  <span key={skill.id}>{skill.name}</span>
                ))}
              </TableCell>
              <TableCell>{t.departmentName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
