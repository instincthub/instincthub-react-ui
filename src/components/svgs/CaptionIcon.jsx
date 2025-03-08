import React from "react";

export default function CaptionIcon(props) {
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
				<rect height="25.1576" opacity="0" width="25.4394" x="0" y="0" />{" "}
				<path
					d="M6.72387 25.1576C7.17094 25.1576 7.48946 24.9147 8.01903 24.4526L12.1347 20.8404L20.4609 20.8404C23.6407 20.8404 25.4394 18.994 25.4394 15.8655L25.4394 6.44215C25.4394 3.31008 23.6407 1.46367 20.4609 1.46367L4.97848 1.46367C1.79508 1.46367 0 3.29109 0 6.44215L0 15.8655C0 19.013 1.79508 20.8404 4.97848 20.8404L5.72988 20.8404L5.72988 23.9999C5.72988 24.7024 6.0961 25.1576 6.72387 25.1576ZM7.08446 23.518L7.08446 20.0723C7.08446 19.5848 6.88922 19.3932 6.40172 19.3932L4.98575 19.3932C2.67305 19.3932 1.45078 18.1063 1.45078 15.8466L1.45078 6.44942C1.45078 4.18969 2.67305 2.91446 4.98575 2.91446L20.45 2.91446C22.7365 2.91446 23.9886 4.18969 23.9886 6.44942L23.9886 15.8466C23.9886 18.1063 22.7365 19.3932 20.45 19.3932L12.1334 19.3932C11.6006 19.3932 11.3306 19.4725 10.9471 19.8568ZM4.9302 12.5041L10.0344 12.5041C10.3368 12.5041 10.5833 12.2539 10.5833 11.9435C10.5833 11.6493 10.3368 11.4027 10.0344 11.4027L4.9302 11.4027C4.62786 11.4027 4.38129 11.6493 4.38129 11.9435C4.38129 12.2539 4.62786 12.5041 4.9302 12.5041ZM12.6019 12.5041L20.529 12.5041C20.8314 12.5041 21.0698 12.2539 21.0698 11.9435C21.0698 11.6493 20.8314 11.4027 20.529 11.4027L12.6019 11.4027C12.2959 11.4027 12.0493 11.6493 12.0493 11.9435C12.0493 12.2539 12.2959 12.5041 12.6019 12.5041ZM4.9302 15.3847L6.97688 15.3847C7.27922 15.3847 7.52133 15.1463 7.52133 14.8439C7.52133 14.5335 7.27922 14.2833 6.97688 14.2833L4.9302 14.2833C4.62786 14.2833 4.38129 14.5335 4.38129 14.8439C4.38129 15.1463 4.62786 15.3847 4.9302 15.3847ZM9.53625 15.3847L15.6035 15.3847C15.9059 15.3847 16.1524 15.1463 16.1524 14.8439C16.1524 14.5335 15.9059 14.2833 15.6035 14.2833L9.53625 14.2833C9.23391 14.2833 8.99543 14.5335 8.99543 14.8439C8.99543 15.1463 9.23391 15.3847 9.53625 15.3847ZM18.171 15.3847L20.529 15.3847C20.8314 15.3847 21.0698 15.1463 21.0698 14.8439C21.0698 14.5335 20.8314 14.2833 20.529 14.2833L18.171 14.2833C17.8686 14.2833 17.6184 14.5335 17.6184 14.8439C17.6184 15.1463 17.8686 15.3847 18.171 15.3847Z"
					fill={props.fills ? props.fills : "var(--OldLavender)"}
					fillOpacity="0.85"
				/>{" "}
			</g>
		</svg>
	);
}
