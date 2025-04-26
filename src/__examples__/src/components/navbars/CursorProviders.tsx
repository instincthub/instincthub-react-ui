"use client";
import { CursorProvider } from "../../../../components/cursors";

export default function CursorProviders({ children }: any) {
  return <CursorProvider enabled={true}>{children}</CursorProvider>;
}
