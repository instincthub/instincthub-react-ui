"use client";
import { SearchObjectsFromDB } from "../../../../index";
import Link from "next/link";
import { useState } from "react";

export default function SearchObjectsFromDBExample() {
  const defaultValues = [
    { id: 1, title: "Skill 1" },
    { id: 2, title: "Skill 2" },
  ];
  const [value, setValue] = useState<object[]>(defaultValues);
  return (
    <section className="ihub-container">
      <h2 className="ihub-text-2xl ihub-font-bold">SearchObjectsFromDB</h2>
      <SearchObjectsFromDB
        label="Search Skills"
        token={""}
        handle={"skills"}
        setSelected={setValue}
        selected={value}
        key_name="display_name"
      />

      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/forms/SearchObjectsFromDB.tsx"
      >
        <button>View codebase</button>
      </Link>
    </section>
  );
}
