import React from "react";
import Typist from "react-typist";
import "react-typist/dist/Typist";

const ReactTypist = () => {
  return (
    <Typist>
      <span> I'm a Student </span>
      <Typist.Backspace count={8} delay={1000} />
      <span> Full stack developer </span>
      <Typist.Backspace count={21} delay={1000} />
      <span> Quality professional </span>
      <Typist.Backspace count={21} delay={1000} />
      <span> Comedian wannabe </span>
      <Typist.Backspace count={26} delay={1000} />
      <span>
        {" "}
        <a className="Lets-connect" href="https://github.com/arifinoid">
          Let's connect
        </a>
        <br />
        and make {""}
        <a
          className="Impact-link"
          href="https://impactbyte.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Impact{" "}
        </a>
        with our{" "}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          code
        </a>
        .
      </span>
    </Typist>
  );
};
export default ReactTypist;
