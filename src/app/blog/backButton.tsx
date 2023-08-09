"use client";

import React from "react";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="hover:-translate-x-1 transition border-fore rounded-full h-10 w-10 grid place-content-center"
    >
      &lt;-
    </button>
  );
}

export default BackButton;
