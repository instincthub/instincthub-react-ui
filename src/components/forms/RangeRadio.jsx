import React from "react";
import styled from "styled-components";

/*
    <RangeRadio options={10}
        ranges="knowledge_scale"
        labels="On a scale of 1-10, how familiar are you about technology?"
    />
*/

const RangeRadio = (props) => {
  const rangeArray = Array.from({ length: props.ranges }, (_, i) => i + 1);

  const handleOptionChange = (event) => {
    props.setSelectedValue(event.target.value);
  };
  if (props.ranges) {
    return (
      <div className={props.names}>
        <h5 className="mt-3">{props.labels}</h5>

        <div className="field">
          <Wrapper>
            {rangeArray.map((option, index) => {
              return (
                <div className="radio_parent" key={index}>
                  <label className="radio">
                    <input
                      type="radio"
                      name={props.names}
                      value={option}
                      required={index === 0 ? props.requireds : false}
                      onChange={handleOptionChange}
                    />
                    <span>{option}</span>
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

export default RangeRadio;

const Wrapper = styled.div`
  max-height: 200px;
  overflow: auto;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  .radio_parent {
    margin-right: 20px;
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
    padding-left: 30px;
    font-weight: 500;
    font-size: 16px;
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
    top: 4px;
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
    top: 10px;
    left: 6px;
    transform: scale(0, 0);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.64, 0.57, 0.67, 1.53);
  }
`;
