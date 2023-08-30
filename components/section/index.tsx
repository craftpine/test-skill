"use client";

import { motion } from "framer-motion";
// import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { ComponentPropsWithoutRef } from "react";

type SectionProps = {
  delay: number;
  mb?: number;
  width?: string;
} & ComponentPropsWithoutRef<"div">;

const Section = ({ children, delay = 0, className = "" }: SectionProps) => (
  <motion.div
    initial={{ y: 60, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 10, opacity: 0 }}
    transition={{ duration: "0.3", delay }}
    className={className}
    // mb={mb}
    // width={width}
  >
    {children}
  </motion.div>
);

export default Section;
