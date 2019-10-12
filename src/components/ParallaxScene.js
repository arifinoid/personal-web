import React, { useEffect, useRef } from "react";
import Parallax from "parallax-js";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const ParallaxScene = props => {
  const sceneDiv = useRef(null);

  useEffect(() => {
    new Parallax(sceneDiv.current, props);
  });

  return <Container ref={sceneDiv}>{props.children}</Container>;
};

export default ParallaxScene;
