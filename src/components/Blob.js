import React from "react";
import ParallaxScene from "./ParallaxScene";
import styled from "styled-components";

import astronauts from "../assets/astronauts.png";

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

const Blob = () => (
  <ParallaxScene>
    <Image
      src={astronauts}
      alt="astronauts"
      data-depth="0.5"
      style={{ top: "10rem", left: "-2.5rem", width: "13rem" }}
    />
  </ParallaxScene>
);

export default Blob;
