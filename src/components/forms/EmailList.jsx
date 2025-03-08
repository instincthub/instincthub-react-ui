import React, { useState } from "react";
import styled from "styled-components";

const EmailList = ({setEmailListValue, names}) => {
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [newGroupEmail, setNewGroupEmail] = useState([]);
  const [message, setMessage] = useState('');

//   const handleEmailChange = (e) => {
//     setNewEmail(e.target.value);
//   };

  const handleEmailAdd = () => {
    const newEmails = newEmail.split(",").map((email) => email.trim());

    if (!emails.includes(newEmails[0])) { // check if email already on the list
      
      // add new email to list.
      setEmails((prevEmails) => [...prevEmails, ...newEmails]);
      
      (setEmailListValue) && setEmailListValue((prevEmails) => [...prevEmails, ...newEmails]);
      setNewEmail("");
      message && setMessage('')
    }
    else{ // print message if already exist. 
      setMessage('Email already exist in the group.')
    }
    
  };

  const handleEmailDelete = (index) => {
    setEmails((prevEmails) => [
      ...prevEmails.slice(0, index),
      ...prevEmails.slice(index + 1),
    ]);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleKeyPress = (e) => {
    console.log(typeof e);
    if ( e === undefined || ["Enter", "Tab", ","].includes(e.key) ) {
        (e) && e.preventDefault();
        if (isValidEmail(newEmail)) {
            handleEmailAdd();
        }
        // else if (newGroupEmail.length){
        //     for (let index = 0; index < newGroupEmail.length; index++) {
        //         const element = newGroupEmail[index];
        //         if (isValidEmail(element)) {
        //             handleEmailAdd();
        //         }
                
        //     }
        // }
       
    }
  };

  return (
    <ReactEmailList className={names}>
      <ul className="field">
        {emails.map((email, index) => (
          <li key={index} className='email_list'>
            <span className="text">{email}</span>
            <span onClick={() => handleEmailDelete(index)} className="material-symbols-outlined icons"> close </span>
          </li>
        ))}
      </ul>
      <input name={names} hidden value={emails} />
      <input
        type="text"
        value={newEmail}
        onChange={(e)=>{
            const newEmails = e.target.value.split(",").map((email) => email.trim());
            if(newEmails.length > 1){
                setNewGroupEmail(newEmails)
            }
            else{
                setNewEmail(e.target.value)
            }
            
        }}
        onBlur={(e)=>{
          // If the user forgot to add comma
          // The event returns undefined object
          if(e.target.value){
            handleKeyPress()
            e.value = ''; // empty the filed. 
          }
        }}
        onM
        onKeyDown={handleKeyPress}
        placeholder="Separate emails with commas or 'Enter'"
      />
      {
        (message) &&
        <p>{ message }</p>
      }
      {/* <button className="default-btn" onClick={handleEmailAdd} readOnly={!isValidEmail(newEmail)}>
        Add Email
      </button> */}
    </ReactEmailList>
  );
};

export default EmailList;

const ReactEmailList = styled.div`
    margin-top: 20px;

    ul{
        max-height: 400px;
        .email_list{
            background-color: #d4d5d6;
            display: inline-block;
            font-size: 14px;
            border-radius: 30px;
            padding: 0px 10px;
            display: inline-flex;
            align-items: center;
            margin: 0 0.3rem 0.3rem 0;
            display: inline-block;
            .text{
                display: inline-block; 
            }
            .icons{
                font-size: 18px;
                position: relative;
                top: 5px;
            }
        }
    } 
    input{
        border: var(--borderDefault);
    }
`;
