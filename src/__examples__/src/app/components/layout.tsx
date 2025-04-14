"use client";

import { Breadcrumb } from "../../../../index";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ihub-container ihub-mt-10">
      <Breadcrumb
        pathMapping={{
          components: "Components",
        }}
      />
      {children}
    </div>
  );
}
