"use client";

import {
  SessionExpiresLogout,
  SessionProviders,
  DarkModeProvider,
  SessionHandleProvider,
} from "../../../../index";
import { ReactNode } from "react";

interface ReactClientProviders {
  children: ReactNode;
  session: any;
}

export default function ReactClientProviders({
  children,
  session,
}: ReactClientProviders) {
  const handle = session?.user?.name?.channels?.active?.channel?.username;
  return (
    <SessionProviders>
      <SessionExpiresLogout session={session}>
        <DarkModeProvider>
          <SessionHandleProvider>
            {/* <ReactTimeTracker
              channel_username={handle}
              session={session}
              endpoint={"/api/user-ip-address"}
            /> */}
            {/* <ChangeStyleVariable primaryColor={"#007bff"} /> */}
            <>{children}</>
          </SessionHandleProvider>
        </DarkModeProvider>
      </SessionExpiresLogout>
    </SessionProviders>
  );
}
