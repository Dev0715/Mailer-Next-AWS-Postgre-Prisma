"use client";

import dynamic from "next/dynamic";

const NewEmail = dynamic(() => import("./_components/_page"), {
  ssr: false
});

export default NewEmail;
