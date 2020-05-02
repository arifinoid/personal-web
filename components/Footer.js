import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  width: 100%;
  font-size: 1rem;
  font-family: "Josefin Sans", sans-serif;
  color: #fff;

  @media (max-width: 767px) {
    text-align: justify;
    font-size: 10px;
  }

  & > p {
    text-align: center;
  }
`;

const FooterComponent = () => (
  <Footer>
    <p>arifinoid &copy; {new Date().getFullYear()}</p>
  </Footer>
);

export default FooterComponent;
