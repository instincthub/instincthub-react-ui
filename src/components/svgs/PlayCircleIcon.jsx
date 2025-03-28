import React from "react";

export default function PlayCircleIcon(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={props.widths ? props.widths : "32"}
			height={props.height ? props.height : "32"}
			focusable="false"
			id={props.ids}
			className={props.className}
		>
			<g>
				{" "}
				<rect height="23.5184" opacity="0" width="23.5103" x="0" y="0" />{" "}
				<path
					d="M11.7533 23.5066C18.1979 23.5066 23.5103 18.1862 23.5103 11.7533C23.5103 5.31234 18.1898 0 11.7452 0C5.31234 0 0 5.31234 0 11.7533C0 18.1862 5.32043 23.5066 11.7533 23.5066ZM11.7533 21.9867C6.08403 21.9867 1.52801 17.4226 1.52801 11.7533C1.52801 6.08403 6.07594 1.51629 11.7452 1.51629C17.4145 1.51629 21.9904 6.08403 21.9904 11.7533C21.9904 17.4226 17.4226 21.9867 11.7533 21.9867ZM9.52559 16.339L16.2154 12.3425C16.6712 12.0758 16.6668 11.4615 16.2154 11.1867L9.52559 7.17574C9.06527 6.90457 8.47359 7.11996 8.47359 7.62879L8.47359 15.8823C8.47359 16.3867 9.03656 16.6308 9.52559 16.339Z"
					fill={props.fills ? props.fills : "var(--Gunmetal)"}
					fillOpacity="0.85"
				/>{" "}
			</g>
		</svg>
	);
}
