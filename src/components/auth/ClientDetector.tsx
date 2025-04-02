"use client";

import React, { useEffect } from "react";

interface Props {
  setIsClientLoaded: (isClientLoaded: boolean) => void;
}

const ClientDetector: React.FC<Props> = ({ setIsClientLoaded }: Props) => {
  useEffect(() => {
    console.log("Checking client-side");
    if (typeof window !== "undefined") {
      console.log("Client-side detected");
      setIsClientLoaded(true);
    }
  }, []);

  return <></>;
};

export default ClientDetector;
