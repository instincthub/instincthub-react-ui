import React from "react";
import styled from "styled-components";

const Reddit = () => {
	return (
		<StartWith
			width="36px"
			height="36px"
			viewBox="0 0 48 48"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs></defs>
			<path
				className="a"
				d="M16.44,22.51a3.11,3.11,0,1,0,3.11,3.11,3.12,3.12,0,0,0-3.11-3.11Zm15.11,0a3.1,3.1,0,0,0-3.1,3.11h0a3.11,3.11,0,1,0,3.1-3.11ZM14.77,32.67a16.58,16.58,0,0,0,13.06,2.41,15.81,15.81,0,0,0,5.52-2.49M20,17.08c.54-.06,1.64-.16,2.18-.2s1.21-.05,1.81-.05A29.19,29.19,0,0,1,35.26,19,4.41,4.41,0,0,1,39,16.83a4.65,4.65,0,0,1,4.5,4.79h0a5,5,0,0,1-1.07,3.11A7.62,7.62,0,0,1,43.5,28.5C43.5,35,34.77,40.17,24,40.18h0C13.23,40.18,4.5,35,4.5,28.5h0a7.69,7.69,0,0,1,1.07-3.78,5,5,0,0,1-1.07-3.1A4.65,4.65,0,0,1,9,16.83H9A4.42,4.42,0,0,1,12.75,19,25.82,25.82,0,0,1,20,17.08Z"
			/>
			<polyline className="a" points="25.19 11.02 20.41 10.2 21.76 16.83" />
			<circle className="a" cx="28.7" cy="11.34" r="3.51" />
		</StartWith>
	);
};

export default Reddit;

let StartWith = styled.svg`
	fill: none;
	stroke: var(--Gunmetal);
	stroke-linecap: round;
	stroke-linejoin: round;
`;
