import React from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  margin-top: 2rem;

  a {
    &:not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }

  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
  }
`;

const ButtonExampleCircularSocial = () => (
  <ButtonContainer>
    <a
      href="http://facebook.com/h4ck3r0hm4d"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button circular color="facebook" icon="facebook" />
    </a>
    <a
      href="http://twitter.com/arifinoid"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button circular color="twitter" icon="twitter" />
    </a>
    <a
      href="https://linkedin.com/in/rohmadarifin/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button circular color="linkedin" icon="linkedin" />
    </a>
    <a
      href="https://github.com/arifinoid"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button circular color="black" icon="github" />
    </a>
  </ButtonContainer>
);

export default ButtonExampleCircularSocial;
