import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

type EmployeeType = {
  id: string;
  fullName: string;
  departmentName: string;
  roleName: string;
  email: string;
};

type EmployeeTableType = {
  querySkills: EmployeeType[];
};

export default function EmployeeTable(props: EmployeeTableType) {
  const { querySkills } = props;
  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <span className="text-default-400 text-small">
          Total {querySkills?.length} users
        </span>
      </div>
      <Table
        aria-label="Example static collection table"
        removeWrapper
        isHeaderSticky
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          // table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Full name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>role</TableColumn>
          <TableColumn>Department</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {querySkills?.map((t: EmployeeType, i: number) => (
            <TableRow key={t.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{t.fullName}</TableCell>
              <TableCell>{t.email}</TableCell>
              <TableCell>{t.roleName}</TableCell>
              <TableCell>{t.departmentName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
