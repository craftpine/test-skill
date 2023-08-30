"use client";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { BsCodeSquare } from "react-icons/bs";
import Section from "../section";

export default function SideBar() {
  const pathname = usePathname();

  const MENU_lIST = [
    {
      title: "Dashboard",
      icon: <AiOutlineHome size={20} />,
      href: "/dashboard",
    },
    {
      title: "Profile",
      icon: <AiOutlineUser size={20} />,
      href: "/dashboard/profile",
    },
    {
      title: "User management",
      icon: <FiUsers size={20} />,
      href: "/dashboard/user-management",
    },
    {
      title: "Setting",
      icon: <AiOutlineSetting size={20} />,
      href: "/dashboard/setting",
    },
  ];

  return (
    <div
      className="bg-white border border-right-[1] shadow-2xl  h-screen w-64 p-4 sticky top-0 left-0
    "
    >
      <Section delay={0.1}>
        <Link href="/" className="flex gap-2 items-center px-4 text-han-purple">
          <BsCodeSquare size={24} />
          <span className="font-bold uppercase">Skill Inventory</span>
        </Link>
      </Section>

      <Section delay={0.2}>
        <Divider className="my-4" />
      </Section>

      <ul className="grid gap-3">
        {MENU_lIST.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 * (i + 1) + 0.1 }}
          >
            <Link
              href={item.href}
              className={`flex gap-3 p-3 cursor-pointer rounded-lg hover:text-white hover:bg-han-purple transition-all hover:shadow-2xl ${
                pathname == item.href ? "text-white bg-han-purple" : ""
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
