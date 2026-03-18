"use client";
import React from "react";

interface PullQuoteProps {
  children: React.ReactNode;
}

export default function PullQuote({ children }: PullQuoteProps) {
  return (
    <blockquote className="ihub-te-pull-quote" data-type="pull-quote">
      {children}
    </blockquote>
  );
}
