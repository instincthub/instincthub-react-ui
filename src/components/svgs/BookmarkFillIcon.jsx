import React from "react";

export default function BookmarkFillIcon(props) {
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
				<rect height="21.2489" opacity="0" width="23.2065" x="0" y="0" />{" "}
				<path
					d="M1.06055 24.5954C1.52578 24.5954 1.82567 24.3436 2.60426 23.582L7.54957 18.6016C7.60453 18.5503 7.69184 18.5503 7.73871 18.6016L12.684 23.582C13.4626 24.34 13.7589 24.5954 14.2277 24.5954C14.8894 24.5954 15.2883 24.1488 15.2883 23.3873L15.2883 3.14531C15.2883 1.07133 14.2331 0 12.1789 0L3.10934 0C1.05516 0 0 1.07133 0 3.14531L0 23.3873C0 24.1488 0.398907 24.5954 1.06055 24.5954Z"
					fill={props.fills ? props.fills : "var(--Gunmetal)"}
					fillOpacity="0.85"
				/>
			</g>
		</svg>
	);
}
