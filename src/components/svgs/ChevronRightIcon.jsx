import React from "react";

export default function ChevronRightIcon(props) {
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
				<rect height="19.5199" opacity="0" width="11.0214" x="0" y="0" />{" "}
				<path
					d="M11.0214 9.7541C11.0214 9.51926 10.9296 9.31512 10.7542 9.15141L1.39301 0.228399C1.23293 0.0764065 1.03688 0 0.804846 0C0.359766 0 0 0.340782 0 0.804846C0 1.02879 0.0881252 1.22567 0.224766 1.37403L9.03574 9.7541L0.224766 18.1342C0.0881252 18.2789 0 18.4713 0 18.7034C0 19.1674 0.359766 19.5082 0.804846 19.5082C1.03688 19.5082 1.23293 19.4282 1.39301 19.2681L10.7542 10.3568C10.9296 10.1814 11.0214 9.98895 11.0214 9.7541Z"
					fill={props.fills ? props.fills : "var(--OldLavender)"}
					fillOpacity="0.85"
				/>{" "}
			</g>
		</svg>
	);
}
