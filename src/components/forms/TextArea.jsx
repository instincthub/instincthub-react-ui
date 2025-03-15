import React from "react";
import styled from "styled-components";

const TextArea = (props) => {
  const showLabel = (e) => {
    if (e.target.value) e.target.parentElement.classList.add("value");
    else e.target.parentElement.classList.remove("value");
  };
  const handleInput = (e) => {
    if (props.setValues) props.setValues(e.target.value);
    if (props.inputEvent) props.inputEvent(e);
    showLabel(e);
  };
  return (
    <div className={props.names}>
      <div className="field">
        <Wrapper className={`input_w ${props.defaultValues ? "value" : ""}`}>
          <textarea
            name={props.names}
            rows={props.rows}
            defaultValue={props.defaultValues}
            onChange={handleInput}
            placeholder={props.placeholder}
            maxLength={props.maxLengths || "auto"}
          ></textarea>
          <span>{props.labels}</span>
        </Wrapper>
      </div>
    </div>
  );
};

export default TextArea;

const Wrapper = styled.div`
  position: relative;
  position: relative;
  margin-top: 25px;
  font-family: var(--Nunito);
  textarea {
    border: 0;
    border: var(--borderDefault);
    border-radius: 5px;
    font-size: inherit;
    outline: none;
    width: 100%;
    padding: 15px 10px;
    font-family: var(--Montserat) !important;
    font-size: 15px;
  }

  span {
    position: absolute;
    top: 8px;
    left: 15px;
    transition: all 0.3s ease;
    pointer-events: none;
    font-size: 1rem;
    color: var(--Gunmetal);
  }
  textarea:focus + span,
  &.value span {
    background: var(--White);
    top: -10px;
    font-family: var(--Nunito);
    height: 20px;
    padding: 5px;
    margin: 0;
    color: var(--DarkCyan);
    font-size: 14px;
    pointer-events: initial;
    left: 15px;
    line-height: 10px;
  }
  /* textarea:focus + span{
        padding: 5px !important;
        top: 10px;
    } */
`;
