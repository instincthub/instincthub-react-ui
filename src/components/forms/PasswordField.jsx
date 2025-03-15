import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SVGs } from "../../assets/svgs/SVGs";

const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      e.target.parentElement.parentElement.classList.add("value");
      if (props.setValues) props.setValues(e.target.value);
      if (props.inputEvent) props.inputEvent(props.names, e.target.value);
    } else e.target.parentElement.classList.remove("value");
  };

  useEffect(() => {
    setPassword(props.defaultValues);
  }, [props.defaultValues]);

  return (
    <div className={props.names}>
      <div className="field">
        <Wrapper>
          <div className="input_icon">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name={props.names}
              required={props.requireds}
              value={password}
              defaultValue={props.defaultValues}
              onChange={handlePasswordChange}
              onFocus={() => setFocused(true)}
              onMouseOut={() => setFocused(false)}
            />
            <Image
              src={showPassword ? SVGs.visibility_off : SVGs.visibility}
              width={20}
              height={20}
              alt="Visibility Icon"
              onClick={handleShowPassword}
              className="symbols"
            />
          </div>
          <span className={`text_label ${focused || (password && "focused")}`}>
            {props.labels}
          </span>
        </Wrapper>
      </div>
    </div>
  );
};

export default PasswordField;

const Wrapper = styled.div`
  position: relative;
  margin-top: 25px;

  span {
    position: absolute;
    top: 15px;
    left: 15px;
    transition: all 0.3s ease;
    pointer-events: none;
    font-size: 1rem;
    color: var(--Gunmetal);
  }
  input {
    border: var(--borderDefault);
    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type="number"] {
      -moz-appearance: textfield;
    }

    :disabled {
      background: #f4f4f4;
    }
  }
  .focused,
  &.value span {
    background: var(--White);
    top: -10px;
    height: 20px;
    padding: 5px;
    margin: 0;
    color: var(--DarkCyan);
    font-size: 14px;
    pointer-events: initial;
    left: 15px;
    line-height: 10px;
    width: auto;
  }
  input.width_auto {
    width: auto;
  }
  .input_icon {
    position: relative;
    .material-symbols-outlined,
    .symbols {
      position: absolute;
      right: 5%;
      top: 27%;
      cursor: pointer;
      z-index: 10;
      width: auto;
    }
  }
`;
