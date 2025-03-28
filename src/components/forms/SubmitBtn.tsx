"use client";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface SubmitBtnProps {
  labels: string;
  status?: number;
  disableds?: boolean;
}

function SubmitBtn(props: SubmitBtnProps) {
  return (
    <div className="ihub-react-button ihub-no-icon">
      <button
        type="submit"
        id="SubmitBtn"
        className="ihub-submit-btn ihub-important-btn ihub-anime-button-chevron"
        disabled={props.status === 0 || props.disableds ? true : false}
      >
        {props.status === 0 && (
          <svg
            className="ihub-bt-spinner"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
          </svg>
        )}
        <span>{props.labels}</span>
        <ChevronRightIcon
          style={{ color: "#ffffff" }}
          id="animate"
          width="16"
          height="16"
        />
      </button>
    </div>
  );
}

export default SubmitBtn;
