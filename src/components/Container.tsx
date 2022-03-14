import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 500px;
  margin: 30px auto;
`;

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <Wrap>{children}</Wrap>;
};

export default Container;
