import React from "react";
import styled from "styled-components";

import Intro from "../components/Intro";
import Footer from "../components/Footer";
import Svg from "../components/Svg";

const Container = styled.div`
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const App = () => (
  <Container>
    <Svg />
    <Intro />
    <Footer />
  </Container>
);

export default App;
