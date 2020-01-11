import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 5rem;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

const WakatimeDashboard = () => (
  <Container>
    <figure>
      <embed src="https://wakatime.com/share/@arifinoid/28535831-31b8-4df3-aab1-9b4293e0554d.svg"></embed>
    </figure>
    <figure>
      <embed src="https://wakatime.com/share/@arifinoid/33eab107-99c7-4763-b043-0e036fee9e29.svg"></embed>
    </figure>
  </Container>
);

export default WakatimeDashboard;
