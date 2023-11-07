"use client";

import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { AnimatePresence } from "framer-motion";
import { NextPage } from "next";

interface Props {}

const LoadingComponent = ({ fallback = false }: { fallback?: boolean }) => {
  return (
    <AnimatePresence>
      <div
        className={`w-full ${
          fallback
            ? "h-full rounded-3xl bg-gradient-to-tr from-accent-2/20 to-accent-2/10"
            : "h-screen"
        } inset-0 grid place-content-center`}
      >

        <CircleBackslashIcon className={"animate-spin text-accent-2 bg-accent-2/10 box-content p-2 rounded-full"} />
      </div>
    </AnimatePresence>
  );
};

export default LoadingComponent;
