// import React from "react";
import styled from "styled-components";
import Tile from "./Tile";
import { TileType } from "../types/type";

const Board = styled.div`
  width: 500px;
  height: 500px;
  background-color: ${(props) => props.theme.tile.board};
  border-radius: 6px;
  padding: 15px;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 15px;
  grid-column-gap: 15px;
`;

interface GameBoardProps {
  tiles: TileType[][];
}

const GameBoard = ({ tiles }: GameBoardProps) => {
  return (
    <>
      <Board>
        {tiles.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile value={tile.value} key={`row-${rowIndex}-col-${colIndex}`} />
          ))
        )}
      </Board>
    </>
  );
};

export default GameBoard;
