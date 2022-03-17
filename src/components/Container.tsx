import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 500px;
  margin: auto;
  /* height: 100vh; */
`;

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <Wrap>{children}</Wrap>;
};

export default Container;
