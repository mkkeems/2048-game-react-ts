import { TileType } from "../types/type";

export const addNewTile = (tiles: TileType[][]) => {
  const getRandomRow = () => Math.floor(Math.random() * 4);
  const getRandomCol = () => Math.floor(Math.random() * 4);
  let updatedTiles: TileType[][] = [...tiles];

  let addedNewTile = false;

  while (!addedNewTile) {
    let row = getRandomRow();
    let col = getRandomCol();
    if (updatedTiles[row][col].value === 0) {
      console.log("row:", row, "col:", col);
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

export const handleArrowClick = (
  eventCode: KeyboardEvent["code"],
  tiles: TileType[][]
): TileType[][] => {
  let updatedTiles: TileType[][] = [];

  const removeZeroArr = (arr: TileType[]): TileType[] => {
    return arr.reduce((newArr: TileType[], curr: TileType) => {
      if (curr.value > 0) {
        newArr.push(curr);
      }
      return newArr;
    }, []);
  };

  if (eventCode === "ArrowRight") {
    updatedTiles = tiles.map((row) => {
      const noZerosArr = removeZeroArr(row);
      let mergedArray: TileType[] = [];

      console.log("noZerosArr", noZerosArr);

      if (noZerosArr.length > 1) {
        mergedArray = noZerosArr.reduceRight(
          (newArr: TileType[], curr: TileType, index, array) => {
            console.log(curr, index, noZerosArr[index - 1], array);

            if (
              noZerosArr[index - 1] &&
              curr.value === noZerosArr[index - 1].value
            ) {
              array.splice(index - 1);
              const doubleCurr: TileType = { value: curr.value * 2 };
              newArr.unshift(doubleCurr);
            } else {
              newArr.unshift(curr);
            }

            return newArr;
          },
          []
        );
      }

      if (noZerosArr.length === 0) {
        mergedArray.unshift({ value: 0 });
      }
      if (noZerosArr.length === 1) {
        mergedArray = [...noZerosArr];
      }

      while (mergedArray.length < 4) {
        mergedArray.unshift({
          value: 0,
        });
      }

      console.log("mergedArray", mergedArray);
      return mergedArray;
    });
  }

  console.log("update tiles after merge");
  updatedTiles = [...addNewTile(updatedTiles)];

  return updatedTiles;
};
