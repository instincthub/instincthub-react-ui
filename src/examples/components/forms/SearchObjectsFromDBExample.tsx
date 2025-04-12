"use client";
import { SearchObjectsFromDB } from "@/index";

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
    </section>
  );
}
