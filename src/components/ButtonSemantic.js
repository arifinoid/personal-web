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
`;

const ButtonExampleCircularSocial = () => (
  <ButtonContainer>
    <a href="http://facebook.com/h4ck3r0hm4d">
      <Button circular color="facebook" icon="facebook" />
    </a>
    <a href="http://twitter.com/arifinoid">
      <Button circular color="twitter" icon="twitter" />
    </a>
    <a href="https://www.linkedin.com/in/rohmadarifin/">
      <Button circular color="linkedin" icon="linkedin" />
    </a>
    <a href="mailto:rohmadarifin007@gmail.com">
      <Button circular color="google plus" icon="google plus" />
    </a>
  </ButtonContainer>
);

export default ButtonExampleCircularSocial;
