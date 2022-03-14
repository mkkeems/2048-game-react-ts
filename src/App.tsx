import React, { useEffect, useState } from "react";
import { Container, GameBoard, Header } from "./components";

function App() {
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  const logKey = (event: KeyboardEvent) => {
    console.log(event.code);
  };

  useEffect(() => {
    window.addEventListener("keydown", logKey);

    return () => {
      window.removeEventListener("keydown", logKey);
    };
  }, [hasLost]);

  return (
    <div className="App">
      <Container>
        <Header />
        <GameBoard />
      </Container>
    </div>
  );
}

export default App;
