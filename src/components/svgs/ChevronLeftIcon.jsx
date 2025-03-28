import React from "react";

export default function ChevronLeftIcon(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="32"
			height="32"
			focusable="false"
			id={props.ids}
		>
			<g>
				{" "}
				<rect height="19.5199" opacity="0" width="11.0214" x="0" y="0" />{" "}
				<path
					d="M0 9.7541C0 9.98895 0.083672 10.1814 0.262735 10.3568L9.62836 19.2681C9.78035 19.4282 9.97641 19.5082 10.2084 19.5082C10.6616 19.5082 11.0214 19.1674 11.0214 18.7034C11.0214 18.4713 10.9252 18.2789 10.7885 18.1342L1.97754 9.7541L10.7885 1.37403C10.9252 1.22567 11.0214 1.02879 11.0214 0.804846C11.0214 0.340782 10.6616 0 10.2084 0C9.97641 0 9.78035 0.0764065 9.62836 0.228399L0.262735 9.15141C0.083672 9.31512 0 9.51926 0 9.7541Z"
					fill={props.fills ? props.fills : "var(--OldLavender)"}
					fillOpacity="0.85"
				/>{" "}
			</g>
		</svg>
	);
}
