import { useEffect, useRef } from "react";
import { TileType } from "../types/type";

export const usePrevious = (tileObj: TileType): TileType => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  // const { value, id, position } = tileObj;
  const ref: any = useRef<TileType>();
  // Store current value in ref
  useEffect(() => {
    ref.current = tileObj;
  }, [tileObj]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
};
