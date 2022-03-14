import React from "react";
import styled from "styled-components";
import NewGameButton from "./NewGameButton";
import ScoreBoard from "./ScoreBoard";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

// interface HeaderProps {
//   children: React.ReactNode;
// }

const Header = () => {
  return (
    <Wrap>
      <ScoreBoard />
      <NewGameButton />
    </Wrap>
  );
};

export default Header;
