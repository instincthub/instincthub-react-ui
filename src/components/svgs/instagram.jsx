import React from "react";
import styled from "styled-components";

const Instagram = () => {
  return (
    <StartWith
      width="36px"
      height="36px"
      viewBox="0 0 48 48"
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style></style>
      </defs>
      <path
        className="cls-1"
        d="M35.38,10.46a2.19,2.19,0,1,0,2.16,2.22v-.06A2.18,2.18,0,0,0,35.38,10.46Z"
      />
      <path
        className="cls-1"
        d="M40.55,5.5H7.45a2,2,0,0,0-1.95,2v33.1a2,2,0,0,0,2,2h33.1a2,2,0,0,0,2-2V7.45A2,2,0,0,0,40.55,5.5Z"
      />
      <path
        className="cls-1"
        d="M24,15.72A8.28,8.28,0,1,0,32.28,24h0A8.28,8.28,0,0,0,24,15.72Z"
      />
    </StartWith>
  );
};

export default Instagram;

let StartWith = styled.svg`
  fill: none;
  stroke: var(--Gunmetal);
  stroke-linecap: round;
  stroke-linejoin: round;
`;
