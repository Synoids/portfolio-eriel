import React from "react";
import CVPage from "@/components/CVPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV | Eriel Budiman",
  description: "Professional CV of Eriel Budiman - Junior Web Developer",
};

export default function Page() {
  return <CVPage />;
}
