import React from "react";
import styled from "styled-components";

import Links from "./Links";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  padding: 0 2rem;

  @media (max-width: 767px) {
    padding: 1rem;
    font-size: calc(7px + 2vmin);
  }
`;

const Paragraph = styled.p`
  font-family: "Josefin Sans", sans-serif;
  color: #fff;
  margin: 0.25rem;
  text-align: center;

  @media (max-width: 767px) {
    text-align: center;
  }

  &:last-of-type {
    margin-bottom: 2rem;
  }
`;

const Introduction = () => (
  <Container>
    <Paragraph>Hello world, I'm Rohmad Arifin.</Paragraph>
    <Paragraph>
      I'm a Software Engineer, Full-stack Developer, and Natural-born Lifetime
      learner
    </Paragraph>
    <Paragraph>
      I like building things that could make folks smile. Let's connect!
    </Paragraph>

    <Links />
  </Container>
);

export default Introduction;
