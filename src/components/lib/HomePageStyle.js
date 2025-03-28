import styled from "styled-components";

export const Testimonial = styled.section`
  .headingH2 {
    max-width: 670px;
    margin: 0 auto;
  }
  h2 {
    margin-bottom: 20px !important;
    color: var(--nesgBlue);
    text-align: center;
    font-family: Montserrat;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 45px;
  }
  p {
    text-align: center;
    margin-bottom: 50px !important;
  }
`;

export const Partners = styled.section`
  margin-top: 30px;
  margin-bottom: 30px;
  h3 {
    color: var(--Gunmetal);
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 10px;
  }
  .img_concept {
    margin-bottom: 50px;
  }
  img {
    width: 300px !important;
    height: 72.21px;
    margin: 0 40px;
    object-fit: contain;
  }
`;

export const Navigation = styled.section`
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  z-index: 100;
  background: var(--FadeGlass);
  input[type="checkbox"]:checked,
  input[type="checkbox"]:hover {
    opacity: 0 !important;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 76px;
      height: 61px;
      object-fit: cover;
      flex-shrink: 0;
    }
    button {
      padding: 10px 20px;
      margin: 0 !important;
    }
    ul {
      li {
        a {
          //   background-color: yellow;
          padding: 8px 20px;
          border-radius: 50px;
          transition: all 0.3s;
          &:hover {
            background-color: ${(props) => props.bk};
            color: var(--White);
            font-weight: bold;
          }
        }
      }
    }

    .outlined-btn {
      margin-right: 15px !important;
    }
    .mini_flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 75%;

      ul {
        display: flex;
        width: 60%;
        // align-items: center;
        justify-content: space-between;
      }
    }
  }
  #rincles {
    transform: translateX(0px);
  }
  @media (min-width: 917px) {
    .menu-wrap {
      display: none;
    }
  }
  @media (max-width: 1200px) {
    .mini_flex {
      width: 85% !important;
    }
  }
  @media (max-width: 917px) {
    .mini_flex {
      display: flex;
      align-items: left !important;
      flex-direction: column;
      position: absolute;
      top: 80px;
      right: 0;
      transition: all 0.5s;
      text-align: left;
      transform: translateX(300px);
      width: 270px !important;
      padding: 15px;
      box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
        rgba(17, 17, 26, 0.1) 0px 0px 8px;
      background-color: var(--White);
      a {
        text-align: left;
      }
      ul {
        width: 100% !important;
        display: flex;
        align-items: left !important;
        flex-direction: column;
      }
    }
    .auth_us {
      margin-top: 30px;
      button {
        margin: 10px !important;
        padding: 10px 40px;
      }
    }
  }
`;
