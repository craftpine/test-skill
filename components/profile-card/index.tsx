import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import dayjs from "dayjs";
import {
  AiOutlineCalendar,
  AiFillCheckCircle,
  AiOutlineMail,
  AiOutlineGroup,
} from "react-icons/ai";
import { MdOutlineWorkOutline } from "react-icons/md";

type ProfileCard = {
  data: {
    fullName: string;
    image: string;
    email: string;
    authorizedBy: string;
    roleName: string;
    overallLevel: string;
    birthday: string;
    jobName: string;
    lastUpdatedByName: string;
    departmentName: string;
    lastUpdatedDate: string;
  };
};

export default function ProfileCard(props: ProfileCard) {
  const { data } = props;
  return (
    <Card className="min-w-[340px] grid gap-3 p-4" isBlurred>
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={data?.image} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600 flex gap-1">
              {data?.fullName}
              {data?.authorizedBy && (
                <AiFillCheckCircle color="green" size={14} />
              )}
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
              <span>
                {data?.birthday
                  ? dayjs(data?.birthday).format("DD-MM-YYYY")
                  : "-"}
              </span>
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
            Update at ({dayjs(data?.lastUpdatedDate).format("DD-MM-YYYY")})
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
  );
}
