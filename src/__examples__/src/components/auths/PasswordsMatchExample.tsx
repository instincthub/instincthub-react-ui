"use client";

import React, { useState } from "react";
import { PasswordsMatch } from "../../../../index";
import Link from "next/link";

const PasswordsMatchExample = () => {
  return (
    <section className="ihub-container">
      <PasswordsMatch />

      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/auth/PasswordsMatch.tsx"
      >
        <button className="ihub-outlined-btn">View codebase</button>
      </Link>
    </section>
  );
};

export default PasswordsMatchExample;
