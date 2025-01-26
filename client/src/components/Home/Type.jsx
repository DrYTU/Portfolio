import React from "react";
import Typewriter from "typewriter-effect";

function Type({ titles }) {
  return (
    <Typewriter
      options={{
        strings: titles,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
