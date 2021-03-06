import { TileType } from "../types/type";

let seqId = 1;

const useIds = () => {
  const nextId = () => {
    return seqId++;
  };

  return [nextId];
};

export const addNewTile = (tiles: TileType[][]) => {
  const getRandomRow = () => Math.floor(Math.random() * 4);
  const getRandomCol = () => Math.floor(Math.random() * 4);
  let updatedTiles: TileType[][] = [...tiles];

  let addedNewTile = false;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [nextId] = useIds();

  while (!addedNewTile) {
    let row = getRandomRow();
    let col = getRandomCol();
    if (updatedTiles[row][col].value === 0) {
      updatedTiles[row][col].value = 2;
      updatedTiles[row][col].id = nextId();
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
        position: [row, col],
      });
    }
  }

  tiles = addNewTile(tiles);
  tiles = addNewTile(tiles);

  return tiles;
};

const checkLoss = (array: TileType[][]): boolean => {
  const falseCheckArr: boolean[] = [];
  for (let i = 0; i < array.length; i++) {
    const row = array[i];
    const col = [];
    array.forEach((arr) => col.push(arr[i]));

    row.forEach((item, index) => {
      if (row[index + 1] && item.value === row[index + 1].value) {
        falseCheckArr.push(false);
      } else {
        falseCheckArr.push(true);
      }
    });
  }

  for (let i = 0; i < array.length; i++) {
    const col: TileType[] = [];
    array.forEach((arr) => col.push(arr[i]));

    col.forEach((item, index) => {
      if (col[index + 1] && item.value === col[index + 1].value) {
        falseCheckArr.push(false);
      } else {
        falseCheckArr.push(true);
      }
    });
  }
  return falseCheckArr.every((val) => val);
};

export const handleArrowClick = (
  eventCode: KeyboardEvent["code"],
  tiles: TileType[][]
): {
  updatedTiles: TileType[][];
  addScore: number;
  gameOver: boolean;
  winGame: boolean;
  loseGame: boolean;
} => {
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
              const doubleCurr: TileType = { ...curr, value: curr.value * 2 };
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
              const doubleCurr: TileType = { ...curr, value: curr.value * 2 };
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
              const doubleCurr: TileType = { ...curr, value: curr.value * 2 };
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
              const doubleCurr: TileType = { ...curr, value: curr.value * 2 };
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

  for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
    const row = updatedTiles[rowIndex];
    for (let colIndex = 0; colIndex < 4; colIndex++) {
      row[colIndex].position = [];
      row[colIndex].position?.push(rowIndex);
      row[colIndex].position?.push(colIndex);
    }
  }

  let winGame = false;
  let loseGame = false;
  let gameOver = false;

  if (checkCanMerge.length > 0 && checkCanMerge.some((val) => val)) {
    updatedTiles = [...addNewTile(updatedTiles)];
  }

  if (
    checkLoss(updatedTiles) &&
    updatedTiles.every((row) => row.every((item) => item.value !== 0))
  ) {
    gameOver = true;
    loseGame = true;
  }

  if (updatedTiles.some((item) => item.some((val) => val.value === 2048))) {
    gameOver = true;
    winGame = true;
  }
  return { updatedTiles, addScore, gameOver, winGame, loseGame };
};
