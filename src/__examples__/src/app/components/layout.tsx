"use client";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="ihub-container ihub-mt-10">{children}</div>;
}
