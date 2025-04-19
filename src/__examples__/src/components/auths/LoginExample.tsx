"use client";

import React, { useState } from "react";
import { LoginForm } from "../../../../index";
import { SearchParamsPageProps } from "../../../../types";
import Link from "next/link";

const LoginExample: React.FC<SearchParamsPageProps> = ({
  params,
  searchParams,
}) => {
  return (
    <section className="ihub-container">
      <LoginForm
        params={params}
        searchParams={searchParams}
        endpointPath="/api/auth/login"
        verificationPath="/auth/verify-email"
        redirectPath="/dashboard"
        type="skills"
      />

      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/auths/LoginExample.tsx"
      >
        <button className="ihub-outlined-btn">View codebase</button>
      </Link>
    </section>
  );
};

export default LoginExample;
