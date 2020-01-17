import React from "react";
import styled from "styled-components";

import logo from "../logo.svg";
import Links from "./Links";

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem 8rem;

  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const Clip = () => (
  <Container>
    <img src={logo} className="App-logo" alt="logo" />

    <h1 className="text-hello-world">Hello world ..</h1>
    <p className="text">
      I'm Rohmad Arifin, I'm a Software Engineer, Full-stack Developer, and
      Natural-born Lifetime learner. Let's connect!
    </p>

    <Links />
  </Container>
);

export default Clip;
