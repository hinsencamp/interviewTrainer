import { useState } from "react";

export function useIndex(startIndex: number = 0, lengthOfSet: number) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  function nextIndex() {
    setCurrentIndex(currentIndex + 1);
  }

  return {
    currentIndex,
    finalIndex: lengthOfSet - 1,
    nextIndex
  };
}
