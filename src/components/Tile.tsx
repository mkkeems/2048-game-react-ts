import { useState, useEffect } from "react";
import styled from "styled-components";
import { usePrevious } from "../hooks";
import { theme } from "../styles/theme";
import { TileType } from "../types/type";
// import { TileType } from "../types/type";

const Wrap = styled.div<TileProps>`
  height: 100%;
  width: 100%;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: ${(props) => (props.value > 4 ? theme.font.light : theme.font.dark)};
  font-size: ${(props) => (props.value > 100 ? "45px" : "55px")};
  background-color: ${(props) => {
    switch (props.value) {
      case 0:
        return theme.tile.empty;
      case 2:
        return theme.tile.two;
      case 4:
        return theme.tile.four;
      case 8:
        return theme.tile.eight;
      case 16:
        return theme.tile.sixteen;
      case 32:
        return theme.tile.thirtytwo;
      case 64:
        return theme.tile.sixtyfour;
      case 128:
        return theme.tile.oneTwoEight;
      case 256:
        return theme.tile.twoFiveSix;
      case 512:
        return theme.tile.fiveOneTwo;
      case 1024:
        return theme.tile.oneOhTwoFour;
      case 2048:
        return theme.tile.twoOhFourEight;
    }
  }};
  transform: ${(props) => {
    return props.value === 0 ? "scale(1)" : `scale(${props.scale})`;
  }};

  /* .innerTile {
    color: ${(props) => (props.value > 4 ? theme.font.light : theme.font.dark)};
    animation: ${(props) => {
    switch (props.keyClicked) {
      case "ArrowUp":
        return `slide-up 500ms;`;
      case "ArrowDown":
        return `slide-down 500ms;`;
      case "ArrowRight":
        return `slide-right 500ms;`;
      case "ArrowLeft":
        return ` slide-left 500ms;`;
      default:
        return `none`;
    }
  }};
  }

  @keyframes slide-right {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }
  @keyframes slide-left {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }
  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }
  @keyframes slide-down {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  } */

  /* transform: ${(props) => {
    switch (props.keyClicked) {
      case "ArrowUp":
        return `translateY(-100%);`;
      case "ArrowDown":
        return `translateY(100%);`;
      case "ArrowRight":
        return `translateX(100%);`;
      case "ArrowLeft":
        return `translateX(-100%);`;
      default:
        return `none`;
    }
  }};

  transition: ${(props) => {
    switch (props.keyClicked) {
      case "ArrowUp":
        return `transform 0.5s ease-in`;
      case "ArrowDown":
        return `transform 0.5s ease-out`;
      case "ArrowRight":
        return `transform 0.5s ease-in-out`;
      case "ArrowLeft":
        return `transform 0.5s ease-in-out`;
    }
  }}; */
`;

interface TileProps {
  value: number;
  keyClicked?: string;
  position?: number[];
  scale?: number;
  tileObj: TileType;
}

const Tile = ({ value = 0, keyClicked, tileObj }: TileProps) => {
  const [scale, setScale] = useState(1);

  const previousTile = usePrevious(tileObj);
  if (previousTile && previousTile.value !== tileObj.value) {
    console.log("prev vs new", previousTile, tileObj);
  }

  const newTile = previousTile && previousTile.value === undefined;
  const changedTile = previousTile && previousTile.value !== value;
  const highlightTile = newTile || changedTile;

  // useEffect will decide if highlight should be triggered.
  useEffect(() => {
    if (highlightTile) {
      setScale(1.1);
      setTimeout(() => setScale(1), 100);
    }
  }, [highlightTile, scale]);

  return (
    <Wrap
      value={value}
      keyClicked={keyClicked}
      scale={scale}
      position={tileObj.position}
      tileObj={tileObj}
    >
      {value === 0 ? "" : value}
    </Wrap>
  );
};

export default Tile;
