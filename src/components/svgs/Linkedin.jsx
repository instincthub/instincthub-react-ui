import React from "react";
import styled from "styled-components";

const Linkedin = () => {
	return (
		<StartWith
			width="30"
			height="30"
			viewBox="0 0 30 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g opacity="0.9">
				<path
					d="M9 10.5C9.82843 10.5 10.5 9.82843 10.5 9C10.5 8.17157 9.82843 7.5 9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82843 8.17157 10.5 9 10.5Z"
					stroke="#2C333A"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M18 12C19.1935 12 20.3381 12.4741 21.182 13.318C22.0259 14.1619 22.5 15.3065 22.5 16.5V21.75H19.5V16.5C19.5 16.1022 19.342 15.7206 19.0607 15.4393C18.7794 15.158 18.3978 15 18 15C17.6022 15 17.2206 15.158 16.9393 15.4393C16.658 15.7206 16.5 16.1022 16.5 16.5V21.75H13.5V16.5C13.5 15.3065 13.9741 14.1619 14.818 13.318C15.6619 12.4741 16.8065 12 18 12V12Z"
					stroke="#2C333A"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M10.5 12.75H7.5V21.75H10.5V12.75Z"
					stroke="#2C333A"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_3232_56695">
					<rect
						width="24.6635"
						height="24.2224"
						fill="white"
						transform="translate(0.671875 0.888672)"
					/>
				</clipPath>
			</defs>
		</StartWith>
	);
};

export default Linkedin;

let StartWith = styled.svg`
	path {
		fill: white;
	}
`;
