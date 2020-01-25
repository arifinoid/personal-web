import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;

  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Link = styled.a`
  text-decoration: none;
  height: 20px;
  width: 20px;
  padding: 5px 5px;
  border-radius: 4px;
  line-height: 20px;
  color: white;
  background: none;
  font-size: 1rem;

  &:visited {
    color: white;
  }

  &:hover {
    color: #000;
    background: #fff;
  }

  & > * {
    display: none;
  }
`;

const ButtonComponent = ({ link, icon }) => (
  <Button aria-label="Center Align">
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden="true"
      className={`fa ${icon}`}
    >
      <span aria-hidden="true">Button Label</span>
    </Link>
  </Button>
);

export default ButtonComponent;
