import React, { useCallback, useEffect, useState } from "react";
import { Container, GameBoard, Header } from "./components";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { generateNewTiles, handleArrowClick } from "./utils";
import { TileType } from "./types/type";

const App = () => {
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  const [tiles, setTiles] = useState<TileType[][]>([]);

  useEffect(() => {
    setTiles(generateNewTiles());
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
        const updatedTiles = handleArrowClick(event.code, tiles);
        setTiles(updatedTiles);
      }
    },
    [tiles]
  );

  useEffect(() => {
    window.addEventListener("keydown", checkKeyboardPress);

    return () => {
      window.removeEventListener("keydown", checkKeyboardPress);
    };
  }, [hasWon, hasLost, checkKeyboardPress]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        // onKeyDown={(e) => checkKeyboardPress(e)}
        // tabIndex={0}
      >
        <Container>
          <Header />
          <GameBoard tiles={tiles} />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
