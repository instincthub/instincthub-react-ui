/* 
    Use JS to change theme color based on channel custom.
    Source: https://www.w3schools.com/css/css3_variables_javascript.asp#:~:text=CSS%20variables%20have%20access%20to,can%20change%20them%20with%20JavaScript.

*/

import { useEffect, useState } from "react";
import LoadingAnimate from "../navbar/LoadingAnimate.server";

const ChangeStyleVariable = ({ primaryColor }) => {
  const [doneLoading, setDoneLoading] = useState(false);

  useEffect(() => {
    // Get the root element
    const r = document.querySelector(":root");
    // Get the styles (properties and values) for the root
    const rs = getComputedStyle(r);
    // Set the value of variable --blue to another value (in this case "lightblue")
    r.style.setProperty("--DarkCyan", primaryColor || "#2C333A");
    setDoneLoading(true);
  }, []);

  if (!doneLoading) {
    return <LoadingAnimate />;
  } else {
    return;
  }
};

export default ChangeStyleVariable;
