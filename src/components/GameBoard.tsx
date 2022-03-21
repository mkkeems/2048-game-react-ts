import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
  position: relative;

  /* .tiles-group {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 15px;
    grid-column-gap: 15px;

    .tiles-enter {
      opacity: 0;
      transform: scale(0.7);
    }
    .tiles-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: opacity 300ms, transform 300ms;
    }
    .tiles-exit {
      opacity: 1;
    }
    .tiles-exit-active {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 300ms, transform 300ms;
    }
  } */
`;

const GameOverWrap = styled.div`
  position: absolute;
  background: rgba(238, 228, 218, 0.73);
  z-index: 9;
  font-size: 80px;
  font-weight: bold;
  color: ${(props) => props.theme.font.dark};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

interface GameBoardProps {
  tiles: TileType[][];
  hasWon: boolean;
  hasLost: boolean;
  newGame: boolean;
  keyClicked?: string;
}

const GameBoard = ({
  tiles,
  hasWon,
  hasLost,
  newGame,
  keyClicked,
}: GameBoardProps) => {
  return (
    <>
      <Board>
        {/* <TransitionGroup className="tiles-group"> */}
        {tiles.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            // <CSSTransition
            //   key={`row-${rowIndex}-col-${colIndex}`}
            //   classNames="tiles"
            //   timeout={500}
            // >
            <Tile
              value={tile.value}
              key={`row-${rowIndex}-col-${colIndex}`}
              keyClicked={keyClicked}
            />
            // </CSSTransition>
          ))
        )}
        {/* </TransitionGroup> */}
        {hasWon && !hasLost && !newGame && (
          <GameOverWrap>
            You Win <br />
            🥳
          </GameOverWrap>
        )}
        {!hasWon && hasLost && !newGame && (
          <GameOverWrap>
            You Lose
            <br />
            😣
          </GameOverWrap>
        )}
      </Board>
    </>
  );
};

export default GameBoard;
