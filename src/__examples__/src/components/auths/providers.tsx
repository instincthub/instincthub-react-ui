"use client";

import React from "react";
import { Provider } from "react-redux";
import { reduxStore } from "../../../../components/lib/redux";

const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
};

export default Providers;
