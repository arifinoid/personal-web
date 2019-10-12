import React from "react";
import styled from "styled-components";

import logo from "../logo.svg";
import ButtonSemantic from "./ButtonSemantic";

const Container = styled.div`
  margin: 0 auto;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #14868c;
  padding: 1em;
  border-radius: 10px;
  width: 275px;
  clip-path: circle(7% at 53.5% 8.5%);
  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #00b6ff;
    clip-path: circle(75%);
  }

  img {
    position: absolute;
    top: 0.125vw;
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

  @media (max-width: 768px) {
    img {
      top: 3.25vw;
    }
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

      <ButtonSemantic />
    </Inner>
  </Container>
);

export default Clip;
