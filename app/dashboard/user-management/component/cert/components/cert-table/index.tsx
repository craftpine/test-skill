import { CertTableType, CertType } from "@/models/skill-search";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import dayjs from "dayjs";
import Link from "next/link";

export default function CertTable(props: CertTableType) {
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
          // table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Full name</TableColumn>
          <TableColumn>Year of birth</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Certifications</TableColumn>
          <TableColumn>Department</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {querySkills?.content?.map((t: CertType, i: number) => (
            <TableRow key={t.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <Link
                    className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-sm text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
                    href={`/dashboard/employee?email=${t.email}`}
                  >
                    <span className="text-bold text-sm capitalize">
                      {t.fullName}
                    </span>
                  </Link>

                  <span className="text-bold text-sm capitalize text-default-400">
                    {t.roleName}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {t.birthday ? dayjs(t.birthday).format("YYYY") : "-"}
              </TableCell>
              <TableCell>{t.email}</TableCell>
              <TableCell>
                {t.certs.map((cert, i) => (
                  <>
                    <span key={cert.id}>{cert.name}</span>
                    {i !== t.certs.length - 1 && (
                      <span className="mx-1">|</span>
                    )}
                  </>
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
