"use client";
import { SearchObjectsFromDB } from "@/index";
import Link from "next/link";

export default function SearchObjectsFromDBExample() {
  return (
    <section className="ihub-container">
      <h2 className="ihub-text-2xl ihub-font-bold">SearchObjectsFromDB</h2>
      <SearchObjectsFromDB
        token={""}
        handle={"skills"}
        setHandleObject={() => {}}
        names="display_name"
        selected={[]}
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
