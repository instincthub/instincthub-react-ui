import React from "react";

export default function FacebookIcon(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			clipRule="evenodd"
			fillRule="evenodd"
			width="32"
			height="32"
			image-rendering="optimizeQuality"
			shape-rendering="geometricPrecision"
			text-rendering="geometricPrecision"
			viewBox="6702.77 18309.17 6561.66 6561.660000000007"
		>
			<path
				d="M9983.6 18309.17c1811.95 0 3280.83 1468.88 3280.83 3280.83s-1468.88 3280.83-3280.83 3280.83S6702.77 23401.95 6702.77 21590s1468.88-3280.83 3280.83-3280.83z"
				fill={props.fillsBk ? props.fillsBk : "#fff"}
			/>
			<path
				d="M10409.89 24843.29v-2534.17h714.43l94.7-891.91h-809.13l1.2-446.44c0-232.63 22.1-357.22 356.24-357.22h446.68v-892.06h-714.59c-858.35 0-1160.42 432.65-1160.42 1160.34v535.45h-535.07v891.99H9339v2498.09c208.45 41.53 423.95 63.47 644.6 63.47a3310.9 3310.9 0 0 0 426.29-27.54z"
				fill={props.fills ? "#fff" : "#006aff"}
				fillRule="nonzero"
			/>
			<script xmlns="" />
		</svg>
	);
}
