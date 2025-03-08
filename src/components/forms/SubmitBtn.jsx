import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { spinBtn } from "../../assets/js/help_func";

/* 
    Calling component:
    <SubmitBtn labels="Add Feedback" status={status} />

    
    Btn Spinner:

    1. Add the "rolling" class on submit. 
    Eg. e.target.querySelector('[type=submit]').classList.add('rolling')
        e.target.querySelector('[type=submit]').disabled = true;

    2. Disable spinning by removing the "rolling" class after getting status from fetch
    if (props.messageType) 
        document.querySelector('[type=submit]').classList.remove('rolling')
        document.querySelector('[type=submit]').disabled = false;

    3. setBtnNotCountdown to disable and enable btn countdown
        If no response in 30 seconds, print message to the user. 

*/
const SubmitBtn = (props) => {
  const [countdown, setCountdown] = useState(0);
  const [message, setMessage] = useState("");

  // Start countdown incase server failed to respond
  // After 60 seconds, tell the user cant process.
  useEffect(() => {
    let timer = null;
    if ((countdown > 0) & !props.status) {
      timer = setInterval(() => {
        setCountdown(countdown - 1);
        if (countdown === 1) {
          setMessage(
            "Sorry, the server cannot process your request, try again."
          );
          spinBtn(document.querySelector("form"), "none", false);
        } else {
          setMessage("");
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);
  return (
    <ReactButton>
      <button
        onClick={() => setCountdown(10)}
        type="submit"
        id="SubmitBtn"
        className={
          props.add_class
            ? "submit_bt " + props.add_class
            : "submit_bt important-btn"
        }
        readOnly={props.disableds}
      >
        <svg
          className="bt-spinner"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
        </svg>
        <span>{props.labels}</span>
      </button>
      {message && !props.status && <p>{message}</p>}
    </ReactButton>
  );
};

export default SubmitBtn;

const ReactButton = styled.div`
  button {
    margin-top: 40px;
    span {
      cursor: pointer;
      font-weight: 600;
      font-size: 16px;
      color: var(--White);
      font-family: var(--Montserat);
    }
    .bt-spinner {
      width: 16px;
      margin-right: 10px;
      fill: #eaeaea;
      position: relative;
      top: 2px;
      animation: rotateSpinner 2s infinite linear;
      display: none;
    }
    @keyframes rotateSpinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    &.rolling .bt-spinner {
      display: inline-block;
    }
    &:disabled {
      opacity: 0.7;
      background-color: var(--DarkCyan);
      border: 1px solid rgba(204, 204, 204, 0.4);
    }
  }
`;
