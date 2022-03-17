import React, { SetStateAction } from "react";
import styled from "styled-components";
import { TileType } from "../types/type";
import { generateNewTiles } from "../utils";

const Button = styled.div`
  background: #8f7a66;
  border-radius: 3px;
  padding: 0 20px;
  color: #f9f6f2;
  line-height: 42px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

interface NewGameButtonProps {
  setNewGame: React.Dispatch<SetStateAction<boolean>>;
  setScore: React.Dispatch<SetStateAction<number>>;
  setTiles: React.Dispatch<SetStateAction<TileType[][]>>;
}

const NewGameButton = ({
  setNewGame,
  setScore,
  setTiles,
}: NewGameButtonProps) => {
  const handleClick = () => {
    setNewGame(true);
    setScore(0);
    setTiles(generateNewTiles());
  };

  return <Button onClick={handleClick}>New Game Button</Button>;
};

export default NewGameButton;
