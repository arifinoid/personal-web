import React from "react";
import styled from "styled-components";

import logo from "../logo.svg";

const Container = styled.div`
  margin: 0 auto;
`;

const Inner = styled.div`
  background: #b22222;
  padding: 1em;
  border-radius: 10px;
  width: 250px;
  clip-path: circle(10% at 88% 12%);
  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #00b6ff;
    clip-path: circle(75%);
  }

  img {
    float: right;
    color: white;
    transition: color 0.5s;
    position: relative;
    margin-right: -8%;
    margin-top: -6.5%;
  }

  h1 {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  p {
    font-size: 1rem;
    text-align: justify;
  }
`;

const Clip = () => (
  <Container>
    <Inner className="inner">
      <img src={logo} className="App-logo" alt="logo" />

      <h1>Hey..</h1>
      <p>
        I'm Rohmad Arifin, I'm a Software Engineer, Full-stack Developer, and
        Lifetime learner. Let's connect!
      </p>
    </Inner>
  </Container>
);

export default Clip;
