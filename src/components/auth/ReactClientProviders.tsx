"use client";

import {
  SessionExpiresLogout,
  SessionProviders,
  DarkModeProvider,
  SessionHandleProvider,
  ReactTimeTracker,
  ChangeStyleVariable,
} from "../../index";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { reduxStore } from "../lib/redux";
import { CursorProvider } from "../cursors";

interface ReactClientProviders {
  children: ReactNode;
  session: any;
  allowTimeTracker?: boolean;
  allowChangeStyleVariable?: boolean;
  primaryColor?: string;
}

/**
 * ReactClientProviders is a component that provides the necessary providers for the application.
 * @example
 * <ReactClientProviders session={session}>
 *   <App />
 * </ReactClientProviders>
 * @param {ReactClientProviders} props - The props for the ReactClientProviders component.
 * @param {ReactNode} props.children - The children to render.
 * @param {any} props.session - The session to use.
 * @param {boolean} props.allowTimeTracker - Whether to allow the time tracker.
 * @param {boolean} props.allowChangeStyleVariable - Whether to allow the change style variable.
 * @param {string} props.primaryColor - The primary color to use.
 * 
 * @note 
 * - Next-auth SessionProvider
 * - ReduxProvider
 * - CursorProvider
 * - SessionExpiresLogout
 * - DarkModeProvider
 * - SessionHandleProvider
 * - ReactTimeTracker
 * - ChangeStyleVariable
 */
export default function ReactClientProviders({
  children,
  session,
  allowTimeTracker = false,
  allowChangeStyleVariable = false,
  primaryColor = "#007bff",
}: ReactClientProviders) {
  const handle = session?.user?.name?.channels?.active?.channel?.username;
  return (
    <SessionProviders>
      <Provider store={reduxStore}>
        <CursorProvider enabled={true}>
          <SessionExpiresLogout session={session}>
            <DarkModeProvider>
              <SessionHandleProvider>
                {allowTimeTracker && (
                  <ReactTimeTracker
                    channel_username={handle}
                    session={session}
                    endpoint={"/api/user-ip-address"}
                  />
                )}
                {allowChangeStyleVariable && (
                  <ChangeStyleVariable primaryColor={primaryColor} />
                )}
                <>{children}</>
              </SessionHandleProvider>
            </DarkModeProvider>
          </SessionExpiresLogout>
        </CursorProvider>
      </Provider>
    </SessionProviders>
  );
}
