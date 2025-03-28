import { appToggle, screenSize, useDispatch } from "@/lib/redux";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionProviders({ children }) {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    // Track screen sizes and save in redux state.
    dispatch(
      screenSize.actions.add({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    );
  }, []);

  return mounted ? (
    <SessionProvider>{children}</SessionProvider>
  ) : (
    <>{children}</>
  );
}
