"use client";
import React from "react";
import { ModalExamples } from "../../../index";
import Link from "next/link";

export default function Modals() {
  return (
    <section className="ihub-container ihub-mt-10">
      <ModalExamples />
      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/status/ModalExamples.tsx"
      >
        <button>View codebase</button>
      </Link>
    </section>
  );
}
