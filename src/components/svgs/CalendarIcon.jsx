import React from "react";

export default function CalendarIcon(props) {
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
					d="M3.45445 21.2489L19.7565 21.2489C22.0459 21.2489 23.2065 20.0774 23.2065 17.8232L23.2065 3.45645C23.2065 1.20223 22.0459 0.0307031 19.7565 0.0307031L3.45445 0.0307031C1.16871 0.0307031 0 1.18324 0 3.45645L0 17.8232C0 20.0964 1.16871 21.2489 3.45445 21.2489ZM3.35133 19.7981C2.11219 19.7981 1.45078 19.1493 1.45078 17.8814L1.45078 7.16121C1.45078 5.90145 2.11219 5.24449 3.35133 5.24449L19.8471 5.24449C21.0645 5.24449 21.7557 5.90145 21.7557 7.16121L21.7557 17.8814C21.7557 19.1493 21.0645 19.7981 19.8471 19.7981ZM9.28219 9.4043L9.97359 9.4043C10.3402 9.4043 10.4364 9.31617 10.4364 8.95324L10.4364 8.26547C10.4364 7.90254 10.3402 7.80633 9.97359 7.80633L9.28219 7.80633C8.91563 7.80633 8.81133 7.90254 8.81133 8.26547L8.81133 8.95324C8.81133 9.31617 8.91563 9.4043 9.28219 9.4043ZM13.2527 9.4043L13.9441 9.4043C14.3107 9.4043 14.415 9.31617 14.415 8.95324L14.415 8.26547C14.415 7.90254 14.3107 7.80633 13.9441 7.80633L13.2527 7.80633C12.8862 7.80633 12.7819 7.90254 12.7819 8.26547L12.7819 8.95324C12.7819 9.31617 12.8862 9.4043 13.2527 9.4043ZM17.2233 9.4043L17.9147 9.4043C18.2812 9.4043 18.3855 9.31617 18.3855 8.95324L18.3855 8.26547C18.3855 7.90254 18.2812 7.80633 17.9147 7.80633L17.2233 7.80633C16.8567 7.80633 16.7641 7.90254 16.7641 8.26547L16.7641 8.95324C16.7641 9.31617 16.8567 9.4043 17.2233 9.4043ZM5.31164 13.3163L5.99496 13.3163C6.36961 13.3163 6.46582 13.2281 6.46582 12.8652L6.46582 12.1774C6.46582 11.8145 6.36961 11.7264 5.99496 11.7264L5.31164 11.7264C4.93699 11.7264 4.84078 11.8145 4.84078 12.1774L4.84078 12.8652C4.84078 13.2281 4.93699 13.3163 5.31164 13.3163ZM9.28219 13.3163L9.97359 13.3163C10.3402 13.3163 10.4364 13.2281 10.4364 12.8652L10.4364 12.1774C10.4364 11.8145 10.3402 11.7264 9.97359 11.7264L9.28219 11.7264C8.91563 11.7264 8.81133 11.8145 8.81133 12.1774L8.81133 12.8652C8.81133 13.2281 8.91563 13.3163 9.28219 13.3163ZM13.2527 13.3163L13.9441 13.3163C14.3107 13.3163 14.415 13.2281 14.415 12.8652L14.415 12.1774C14.415 11.8145 14.3107 11.7264 13.9441 11.7264L13.2527 11.7264C12.8862 11.7264 12.7819 11.8145 12.7819 12.1774L12.7819 12.8652C12.7819 13.2281 12.8862 13.3163 13.2527 13.3163ZM17.2233 13.3163L17.9147 13.3163C18.2812 13.3163 18.3855 13.2281 18.3855 12.8652L18.3855 12.1774C18.3855 11.8145 18.2812 11.7264 17.9147 11.7264L17.2233 11.7264C16.8567 11.7264 16.7641 11.8145 16.7641 12.1774L16.7641 12.8652C16.7641 13.2281 16.8567 13.3163 17.2233 13.3163ZM5.31164 17.2363L5.99496 17.2363C6.36961 17.2363 6.46582 17.1401 6.46582 16.7808L6.46582 16.0894C6.46582 15.7264 6.36961 15.6383 5.99496 15.6383L5.31164 15.6383C4.93699 15.6383 4.84078 15.7264 4.84078 16.0894L4.84078 16.7808C4.84078 17.1401 4.93699 17.2363 5.31164 17.2363ZM9.28219 17.2363L9.97359 17.2363C10.3402 17.2363 10.4364 17.1401 10.4364 16.7808L10.4364 16.0894C10.4364 15.7264 10.3402 15.6383 9.97359 15.6383L9.28219 15.6383C8.91563 15.6383 8.81133 15.7264 8.81133 16.0894L8.81133 16.7808C8.81133 17.1401 8.91563 17.2363 9.28219 17.2363ZM13.2527 17.2363L13.9441 17.2363C14.3107 17.2363 14.415 17.1401 14.415 16.7808L14.415 16.0894C14.415 15.7264 14.3107 15.6383 13.9441 15.6383L13.2527 15.6383C12.8862 15.6383 12.7819 15.7264 12.7819 16.0894L12.7819 16.7808C12.7819 17.1401 12.8862 17.2363 13.2527 17.2363Z"
					fill={props.fills ? props.fills : "var(--Gunmetal)"}
					fillOpacity="0.85"
				/>
			</g>
		</svg>
	);
}
