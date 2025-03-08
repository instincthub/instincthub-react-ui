import React from "react";

export default function FullScreenIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.widths ? props.widths : "32"}
      height={props.height ? props.height : "32"}
      focusable="false"
      id={props.ids}
    >
      <g>
        {" "}
        <rect height="21.2255" opacity="0" width="27.4439" x="0" y="0" />{" "}
        <path
          d="M3.45445 21.2182L13.0567 21.2182L13.0567 19.7711L3.48153 19.7711C2.16071 19.7711 1.45078 19.0737 1.45078 17.7205L1.45078 11.292L0 11.292L0 17.8005C0 20.0657 1.16871 21.2182 3.45445 21.2182ZM14.4224 21.2182L23.9858 21.2182C26.2833 21.2182 27.4439 20.0548 27.4439 17.8005L27.4439 11.292L25.9931 11.292L25.9931 17.7205C25.9931 19.0737 25.257 19.7711 23.9624 19.7711L14.4224 19.7711ZM25.9931 9.93434L27.4439 9.93434L27.4439 3.42574C27.4439 1.17152 26.2833 0 23.9858 0L14.4224 0L14.4224 1.45078L23.9624 1.45078C25.257 1.45078 25.9931 2.15262 25.9931 3.50578ZM0 9.93434L1.45078 9.93434L1.45078 3.50578C1.45078 2.15262 2.16071 1.45078 3.48153 1.45078L13.0567 1.45078L13.0567 0L3.45445 0C1.16871 0 0 1.16063 0 3.42574Z"
          fill="#FFFFFF"
          fillOpacity="0.85"
        />{" "}
      </g>
    </svg>
  );
}
