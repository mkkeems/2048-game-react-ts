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
): { updatedTiles: TileType[][]; addScore: number } => {
  let updatedTiles: TileType[][] = [];
  let checkCanMerge: boolean[] = [];
  let addScore = 0;

  const removeZeroArr = (arr: TileType[]): TileType[] => {
    return arr.reduce((newArr: TileType[], curr: TileType) => {
      if (curr.value > 0) {
        newArr.push(curr);
      }
      return newArr;
    }, []);
  };

  // TODO: check if tiles in clicked direction can merges
  // currently checking if there are any changes after merging moved tiles from original row
  // but better way would be to skip the merge completely if array is 0 0 on side depending on direction clicked
  const checkArraysMatch = (arr1: TileType[], arr2: TileType[]) => {
    for (let i = 0; i < 4; i++) {
      if (arr1[i].value !== arr2[i].value) {
        checkCanMerge.push(true);
      } else {
        checkCanMerge.push(false);
      }
    }
  };

  if (eventCode === "ArrowRight") {
    updatedTiles = tiles.map((row) => {
      const noZerosArr = removeZeroArr(row);
      let mergedArray: TileType[] = [];

      if (noZerosArr.length === 0) {
        mergedArray.unshift({ value: 0 });
      }
      if (noZerosArr.length === 1) {
        mergedArray = [...noZerosArr];
      }
      if (noZerosArr.length > 1) {
        mergedArray = noZerosArr.reduceRight(
          (newArr: TileType[], curr: TileType, index, array) => {
            if (
              noZerosArr[index - 1] &&
              curr.value === noZerosArr[index - 1].value
            ) {
              array.splice(index - 1);
              addScore += curr.value * 2;
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

      while (mergedArray.length < 4) {
        mergedArray.unshift({
          value: 0,
        });
      }

      checkArraysMatch(mergedArray, row);

      return mergedArray;
    });
  }

  if (eventCode === "ArrowLeft") {
    updatedTiles = tiles.map((row) => {
      const noZerosArr = removeZeroArr(row);
      let mergedArray: TileType[] = [];

      if (noZerosArr.length === 0) {
        mergedArray.push({ value: 0 });
      }
      if (noZerosArr.length === 1) {
        mergedArray = [...noZerosArr];
      }
      if (noZerosArr.length > 1) {
        mergedArray = noZerosArr.reduce(
          (newArr: TileType[], curr: TileType, index, array) => {
            if (array[index + 1] && curr.value === array[index + 1].value) {
              array.splice(index + 1, 1);
              addScore += curr.value * 2;
              const doubleCurr: TileType = { value: curr.value * 2 };
              newArr.push(doubleCurr);
            } else {
              newArr.push(curr);
            }
            return newArr;
          },
          []
        );
      }

      while (mergedArray.length < 4) {
        mergedArray.push({
          value: 0,
        });
      }

      checkArraysMatch(mergedArray, row);
      return mergedArray;
    });
  }

  if (eventCode === "ArrowDown") {
    const mergedPreFlipped = [];

    for (let i = 0; i < tiles.length; i++) {
      let score = 0;
      const col: TileType[] = [];
      tiles.forEach((row) => col.push(row[i]));
      const noZerosArr = removeZeroArr(col);

      let mergedArray: TileType[] = [];

      if (noZerosArr.length === 0) {
        mergedArray.unshift({ value: 0 });
      }
      if (noZerosArr.length === 1) {
        mergedArray = [...noZerosArr];
      }
      if (noZerosArr.length > 1) {
        mergedArray = noZerosArr.reduceRight(
          (newArr: TileType[], curr: TileType, index, array) => {
            if (
              noZerosArr[index - 1] &&
              curr.value === noZerosArr[index - 1].value
            ) {
              array.splice(index - 1);
              score = curr.value * 2;
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

      while (mergedArray.length < 4) {
        mergedArray.unshift({
          value: 0,
        });
      }

      checkArraysMatch(mergedArray, col);
      mergedPreFlipped.push(mergedArray);
      addScore += score;
    }
    let mergedFlipped: TileType[][] = [[], [], [], []];

    for (let i = 0; i < 4; i++) {
      mergedPreFlipped.forEach((row: TileType[]) => {
        mergedFlipped[i].push(row[i]);
      });
    }

    updatedTiles = [...mergedFlipped];
  }

  if (eventCode === "ArrowUp") {
    const mergedPreFlipped = [];

    for (let i = 0; i < tiles.length; i++) {
      let score = 0;
      const col: TileType[] = [];
      tiles.forEach((row) => col.push(row[i]));
      const noZerosArr = removeZeroArr(col);

      let mergedArray: TileType[] = [];

      if (noZerosArr.length === 0) {
        mergedArray.push({ value: 0 });
      }
      if (noZerosArr.length === 1) {
        mergedArray = [...noZerosArr];
      }
      if (noZerosArr.length > 1) {
        mergedArray = noZerosArr.reduce(
          (newArr: TileType[], curr: TileType, index, array) => {
            if (
              noZerosArr[index + 1] &&
              curr.value === noZerosArr[index + 1].value
            ) {
              array.splice(index + 1, 1);
              score += curr.value * 2;
              const doubleCurr: TileType = { value: curr.value * 2 };
              newArr.push(doubleCurr);
            } else {
              newArr.push(curr);
            }

            return newArr;
          },
          []
        );
      }

      while (mergedArray.length < 4) {
        mergedArray.push({
          value: 0,
        });
      }

      checkArraysMatch(mergedArray, col);
      mergedPreFlipped.push(mergedArray);
      addScore += score;
    }
    let mergedFlipped: TileType[][] = [[], [], [], []];

    for (let i = 0; i < 4; i++) {
      mergedPreFlipped.forEach((row: TileType[]) => {
        mergedFlipped[i].push(row[i]);
      });
    }
    updatedTiles = [...mergedFlipped];
  }

  if (checkCanMerge.length > 0 && checkCanMerge.some((val) => val)) {
    updatedTiles = [...addNewTile(updatedTiles)];
  }

  return { updatedTiles, addScore };
};
