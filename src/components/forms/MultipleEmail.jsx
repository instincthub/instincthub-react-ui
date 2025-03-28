import React from "react";
import styled from "styled-components";

// import "./styles.css";

class MultipleEmail extends React.Component {
  state = {
    items: [],
    value: "",
    error: null,
  };

  handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: "",
        });
      }
    }
  };

  handleChange = (evt) => {
    this.setState({
      value: evt.target.value,
      error: null,
    });
  };

  handleDelete = (item) => {
    this.setState({
      items: this.state.items.filter((i) => i !== item),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { items } = this.state;
    console.log(`${items}`);
  };

  handlePaste = (evt) => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter((email) => !this.isInList(email));

      this.setState({
        items: [...this.state.items, ...toBeAdded],
      });
    }
  };

  isValid(email) {
    let error = null;

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isInList(email) {
    return this.state.items.includes(email);
  }

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  render() {
    return (
      <HandleMultipleEmail onSubmit={this.handleSubmit}>
        {this.state.items.map((item) => (
          <div className="tag-item" key={item}>
            <p> {item}</p>
            <button
              type="button"
              className="button"
              onClick={() => this.handleDelete(item)}
            >
              &times;
            </button>
          </div>
        ))}

        <input
          className={"input " + (this.state.error && " has-error")}
          value={this.state.value}
          placeholder="Seprate emails with commas or 'Enter'"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onPaste={this.handlePaste}
        />

        {this.state.error && <p className="error">{this.state.error}</p>}
      </HandleMultipleEmail>
    );
  }
}

export default MultipleEmail;

let HandleMultipleEmail = styled.div`
  margin-top: 25px;

  button {
    margin: 0 20px;
    padding: 0;
    font-size: 20px;
    font-weight: 300;
  }
  input {
    border: var(--borderDefault);
  }
  .input:focus {
    border-color: var(--DarkCyan);
    outline: none;
  }

  .input.has-error {
    border-color: tomato;
  }

  .error {
    margin: 0;
    font-size: 90%;
    color: tomato;
  }

  .tag-item {
    background-color: #d4d5d6;
    display: inline-block;
    font-size: 14px;
    border-radius: 30px;
    height: 30px;
    padding: 0 4px 0 1rem;
    display: inline-flex;
    align-items: center;
    margin: 0 0.3rem 0.3rem 0;
    max-height: 400px;
  }
`;
