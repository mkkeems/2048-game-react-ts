import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { TileType } from "../types/type";

const Wrap = styled.div<TileType>`
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
`;

const Tile = ({ value = 0 }: TileType) => {
  return <Wrap value={value}>{value === 0 ? "" : value}</Wrap>;
};

export default Tile;
