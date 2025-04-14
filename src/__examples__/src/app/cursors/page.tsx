"use client";

import React, { useState } from "react";
import { CursorControlDemo } from "../../../../components/cursors";
import Link from "next/link";

const CursorPage = () => {
  return (
    <section className="ihub-container ihub-pt-9 ihub-mt-9">
      <CursorControlDemo />
      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/cursors"
      >
        <button className="ihub-btn ihub-btn-secondary">View codebase</button>
      </Link>
    </section>
  );
};

export default CursorPage;
