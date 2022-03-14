import { TileType } from "../types/type";

export const addNewTile = (tiles: TileType[][]) => {
  const getRandomRow = () => Math.floor(Math.random() * 4);
  const getRandomCol = () => Math.floor(Math.random() * 4);
  let updatedTiles: TileType[][] = tiles;

  let addedNewTile = false;

  while (!addedNewTile) {
    let row = getRandomRow();
    let col = getRandomCol();
    if (updatedTiles[row][col].value === 0) {
      updatedTiles[row][col].value = 2;
      addedNewTile = true;
    }
  }
  return updatedTiles;
};

export const generateNewTiles = () => {
  let tiles: TileType[][] = [];

  for (let row = 0; row < 4; row++) {
    tiles.push([]);
    for (let col = 0; col < 4; col++) {
      tiles[row].push({
        value: 0,
      });
    }
  }
  tiles = addNewTile(tiles);
  tiles = addNewTile(tiles);
  return tiles;
};
