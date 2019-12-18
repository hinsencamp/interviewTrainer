import { useState, useEffect } from "react";
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

  function storeResult(id: string, completionStatus: Status) {
    setFinalResults({
      ...finalResults,
      [completionStatus]: [...finalResults[completionStatus], id]
    });
  }
  return {
    finalResults,
    storeResult
  };
}
