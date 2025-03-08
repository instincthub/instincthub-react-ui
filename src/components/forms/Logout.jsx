import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';


const Logout = () => {
  const router = useRouter();

  const removeAllCookies = () =>{
    const cookies = document.cookie.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    }
  }
  

  const handleLogout = async () => {
    try {
      // Code to log out the user
      removeAllCookies()
      router.push('/accounts/login');
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  };

  return (
    <ReactLogout onClick={handleLogout} className="outline-btn">Logout</ReactLogout>
  );
};

export default Logout;

const ReactLogout = styled.button`

`;
