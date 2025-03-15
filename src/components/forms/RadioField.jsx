import React from "react";
import styled from "styled-components";

/*
    <RadioField options={[
        {title: '100', id: 100},
        {title: '200', id: 200},
        {title: '300', id: 300},
        {title: '400', id: 400},
        {title: '500', id: 500},
    ]}
        names="level"
        labels="Current Level *"
    />
*/

const RadioField = (props) => {
  const handleOptionChange = (event) => {
    if (props.setSelectedValue) {
      props.setSelectedValue(event.target.value);
    }
  };

  if (props.options) {
    return (
      <div className={props.names}>
        <h5 className="mt-3">{props.labels}</h5>

        <div className="field">
          <Wrapper>
            {props.options.map((option, index) => {
              return (
                <div className="radio_parent" key={index}>
                  <label className="radio">
                    <input
                      type="radio"
                      name={props.names}
                      id={props.names + index}
                      value={option.id}
                      required={index === 0 ? props.requireds : false}
                      onChange={handleOptionChange}
                      defaultChecked={
                        props.defaultValues === option.id ? true : false
                      }
                    />
                    <span className="label-title">
                      {option.title ? option.title : option.name}
                    </span>
                  </label>
                </div>
              );
            })}
          </Wrapper>
        </div>
      </div>
    );
  }
};

export default RadioField;

const Wrapper = styled.div`
  max-height: 200px;
  overflow: auto;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  .radio_parent {
    margin-bottom: 15px;
  }

  .radio {
    display: block;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    text-align: left;
  }
  .radio input {
    display: none;
  }
  input:valid {
    background-color: var(--White);
  }
  input {
    width: 100%;
    font-style: var(--Montserat);
    padding: 15px;
    border: 1px solid #d0d0d0;
    border-radius: 5px;
    height: 50px;
    font-size: 15px;
    outline: 0;
    /* background-color: transparent; */
  }
  .radio input + span {
    display: inline-block;
    position: relative;
    padding-left: 40px;
    font-weight: 500;
    font-size: 1rem;
    margin-top: 10px;
  }
  .radio input:checked + span::after,
  .radio input:checked + h3::after {
    opacity: 1;
    transform: scale(1, 1);
  }
  .radio input + span::before {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: 0;
    border-radius: 50%;
    margin-right: 5px;
    width: 20px;
    height: 20px;
    border: 1px solid var(--DarkCyan);
  }
  .radio input + span::after {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background-color: var(--DarkCyan);
    position: absolute;
    border-radius: 50%;
    position: absolute;
    top: 6px;
    left: 6px;
    transform: scale(0, 0);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.64, 0.57, 0.67, 1.53);
  }
`;
