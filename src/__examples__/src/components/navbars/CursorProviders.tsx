"use client";
import { Cursor, CursorProvider, MagneticButton } from "../../../../components/cursors";

export default function CursorProviders({ children }: any) {
  return <CursorProvider enabled={true}>{children}</CursorProvider>;
}
