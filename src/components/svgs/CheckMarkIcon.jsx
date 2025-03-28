import React from "react";

export default function CheckMarkIcon(props) {
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
					d="M7.17926 20.0878C7.55239 20.0878 7.84184 19.9197 8.0468 19.6059L19.3898 1.87782C19.5499 1.6179 19.6065 1.42911 19.6065 1.23586C19.6065 0.747542 19.2827 0.423752 18.798 0.423752C18.4455 0.423752 18.2495 0.539768 18.0445 0.865198L7.14328 18.0416L1.61332 11.1293C1.39301 10.8281 1.1727 10.7004 0.848908 10.7004C0.348048 10.7004 0 11.0484 0 11.5331C0 11.7373 0.0881252 11.9657 0.259923 12.1815L6.27656 19.5934C6.54094 19.9306 6.80614 20.0878 7.17926 20.0878Z"
					fill={props.fills ? props.fills : "var(--Gunmetal)"}
					fillOpacity="0.85"
				/>{" "}
			</g>
		</svg>
	);
}
