import React from "react";

export default function PlayCircleFillIcon(props) {
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
					d="M11.7533 23.5066C18.1979 23.5066 23.5103 18.1862 23.5103 11.7533C23.5103 5.31234 18.1898 0 11.7452 0C5.31234 0 0 5.31234 0 11.7533C0 18.1862 5.32043 23.5066 11.7533 23.5066ZM9.50496 16.436C9.00422 16.7359 8.42871 16.4918 8.42871 15.9749L8.42871 7.55074C8.42871 7.03828 9.03656 6.81035 9.50496 7.08598L16.333 11.1823C16.7889 11.4571 16.797 12.0875 16.333 12.3704Z"
					fill={props.fills ? props.fills : "var(--Gunmetal)"}
					fillOpacity="0.85"
				/>{" "}
			</g>
		</svg>
	);
}
