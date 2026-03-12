"use client";
import React, { useState } from "react";
import { SearchObjectsFromDB } from "../../../../index";
import Link from "next/link";

export default function SearchObjectsFromDBExample() {
  const defaultValues = [
    { id: 1, title: "Skill 1" },
    { id: 2, title: "Skill 2" },
  ];
  const [value, setValue] = useState<object[]>(defaultValues);
  const [valueFromUrl, setValueFromUrl] = useState<object[]>([]);

  const defaultOptions = [
    { id: 1, title: "Skill 1" },
    { id: 2, title: "Skill 2" },
    { id: 3, title: "Skill 3" },
    { id: 4, title: "Skill 4" },
  ];

  return (
    <section className="ihub-container">
      <h2 className="ihub-text-2xl ihub-font-bold">SearchObjectsFromDB</h2>

      {/* Static options */}
      <SearchObjectsFromDB
        label="Search Skills (static options)"
        token={""}
        handle={"skills"}
        setSelected={setValue}
        selected={value}
        keyName="display_name"
        options={defaultOptions}
      />

      {/* defaultUrl: initial list fetched from API, search replaces list (no duplicates) */}
      <SearchObjectsFromDB
        label="Search Groups (defaultUrl — no duplicates)"
        token={""}
        handle={"demo"}
        setSelected={setValueFromUrl}
        selected={valueFromUrl}
        keyName="title"
        placeholder="Search groups by name..."
        defaultUrl={"/api/v1/leads/demo/groups/"}
        searchUrl={"/api/v1/leads/demo/groups/"}
        limitSelect={0}
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
