import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  GameBoard,
  Header,
  ScoreBoard,
  NewGameButton,
} from "./components";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { generateNewTiles, handleArrowClick } from "./utils";
import { TileType } from "./types/type";
import { GlobalStyle } from "./styles/GlobalStyle";

const App = () => {
  const [newGame, setNewGame] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState<TileType[][]>([]);

  useEffect(() => {
    setNewGame(true);
    setTiles(generateNewTiles());
    setScore(0);
  }, []);

  const checkKeyboardPress = useCallback(
    (event: KeyboardEvent) => {
      if (
        tiles.length > 0 &&
        (event.code === "ArrowRight" ||
          event.code === "ArrowLeft" ||
          event.code === "ArrowUp" ||
          event.code === "ArrowDown")
      ) {
        const { updatedTiles, addScore, gameOver, winGame, loseGame } =
          handleArrowClick(event.code, tiles);
        setScore(score + addScore);
        setTiles(updatedTiles);

        if (gameOver && winGame) {
          console.log("gameOVER?", gameOver);
          setHasWon(true);
          setNewGame(false);
        }

        if (gameOver && loseGame) {
          console.log("gameOVER?", gameOver);
          setHasLost(true);
          setNewGame(false);
        }
      }
    },
    [tiles, score]
  );

  useEffect(() => {
    if (newGame) {
      window.addEventListener("keydown", checkKeyboardPress);
    }

    if (!newGame) {
      window.removeEventListener("keydown", checkKeyboardPress);
    }

    return () => {
      window.removeEventListener("keydown", checkKeyboardPress);
    };
  }, [hasWon, hasLost, checkKeyboardPress, newGame]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <Container>
          <Header>
            <h1>2048</h1>
            <div>
              <ScoreBoard score={score} />
              <NewGameButton
                setNewGame={setNewGame}
                setScore={setScore}
                setTiles={setTiles}
              />
            </div>
          </Header>
          <GameBoard
            tiles={tiles}
            hasWon={hasWon}
            hasLost={hasLost}
            newGame={newGame}
          />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
