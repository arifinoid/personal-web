import React from "react";
import styled from "styled-components";

import ButtonComponent from "./Button";
import data from "../constant/links";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const LinkComponent = () => (
  <Container>
    {data.map((item, i) => (
      <ButtonComponent link={item.link} icon={item.icon} key={i} />
    ))}
  </Container>
);

export default LinkComponent;
