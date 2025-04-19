"use client";
import {
  Cursor,
  CursorProvider,
  MagneticButton,
} from "../../../../components/cursors";
import { Provider } from "react-redux";
import { reduxStore } from "../../../../components/lib/redux";

export default function CursorProviders({ children }: any) {
  return (
    <CursorProvider enabled={true}>
      <Provider store={reduxStore}>{children}</Provider>
    </CursorProvider>
  );
}
