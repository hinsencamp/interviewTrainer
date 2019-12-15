import { useState } from "react";
import { COMPLETED, FAILED } from "./resultConst";

enum Status {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}

export function useResultCounter() {
  const [finalResults, setFinalResults] = useState({
    [COMPLETED]: [],
    [FAILED]: []
  });

  function handleResult(index: number, completionStatus: Status) {
    setFinalResults({
      ...finalResults,
      [completionStatus]: [...finalResults[completionStatus], index]
    });
    console.log(finalResults);
  }
  return {
    finalResults,
    handleResult
  };
}
