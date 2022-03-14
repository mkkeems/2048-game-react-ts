import React from "react";
import styled from "styled-components";
import { TileType } from "../types/type";

const Wrap = styled.div`
  background-color: #cdc1b4;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 55px;
`;

const Tile = ({ value = 0 }: TileType) => {
  return <Wrap>{value === 0 ? "" : value}</Wrap>;
};

export default Tile;
