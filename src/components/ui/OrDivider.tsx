"use client";
import React from "react";
import styled from "styled-components";

interface OrDividerProps {
  labels?: string;
}

export default function OrDivider({ labels }: OrDividerProps) {
  return (
    <ReactOrDivider textwidth={labels ? labels.length * 12 : 2 * 12}>
      <div className="or_divider">
        <p className="or_line"></p>
        <p className="or_text">{labels || "or"}</p>
        <p className="or_line"></p>
      </div>
    </ReactOrDivider>
  );
}

interface StyledOrDividerProps {
  textwidth: number;
}

const ReactOrDivider = styled.section<StyledOrDividerProps>`
  .or_divider {
    display: flex;
    justify-content: space-between;
    margin: 40px 0px;

    .or_text {
      display: inline;
      margin: 0px;
      position: relative;
      top: -13px;
      width: ${(props) => props.textwidth}px;
      text-align: center;
    }
    .or_line {
      width: 40%;
      height: 1px;
      background-color: var(--LavenderGray);
      margin: 0px;
    }
  }
`;
