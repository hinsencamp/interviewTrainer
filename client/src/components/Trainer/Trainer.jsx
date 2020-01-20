import React, { useEffect, useState } from "react";

// Hooks
import { useLocalStorage } from "utils/hooks";
import { useIndex } from "./useIndex";
import { useResultCounter } from "./useResultCounter";
import TabGroup from "./TabGroup";
// UI
import { Button, Intent } from "@blueprintjs/core";
import CompletionDialog from "./CompletionDialog";
import { COMPLETED, FAILED } from "./resultConst";

import style from "./Trainer.module.scss";

// TODO: fetch complete Training set at once
// store it
// create preview of types / difficulties of questions
// timeline visualisation
// TODO: User stats
// count how many trainings of type X have been completed

//TODO: prompt user with dialog, when leaving the trainings area, reset local storage

export function Trainer({ trainingSet }) {
  const { finalResults, storeResult } = useResultCounter();
  const { storedValue: storedIndex, setValue, removeValue } = useLocalStorage(
    "currentIndex",
    0
  );

  const [currentQuestion, setCurrentQuestion] = useState(
    trainingSet[storedIndex]
  );
  const { currentIndex, finalIndex, nextIndex } = useIndex(
    storedIndex,
    trainingSet.length
  );
  const [isComplete, setComplete] = useState(false);

  // set initial question
  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    setCurrentQuestion(trainingSet[currentIndex]);
  }, [trainingSet.length]);

  // change to next question
  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    setCurrentQuestion(trainingSet[currentIndex]);
    setValue(currentIndex);
  }, [currentIndex]);

  // collect final result of training
  useEffect(() => {
    if (currentIndex === finalIndex) {
      removeValue();
    }
  });

  function nextQuestion() {
    nextIndex();
    setCurrentQuestion(trainingSet[currentIndex]);
  }

  function handleQuestionCompletion(completionStatus) {
    storeResult(currentQuestion.id, completionStatus);
    if (currentIndex !== finalIndex) {
      nextQuestion();
    } else {
      setComplete(true);
    }
  }

  function handleClose() {
    setComplete(false);
  }

  return (
    <>
      <TabGroup question={currentQuestion}></TabGroup>
      <div className={style.completionPanel}>
        <Button
          icon="floppy-disk"
          onClick={() => handleQuestionCompletion(FAILED)}
        >
          Save for Repetition
        </Button>
        <Button
          intent={Intent.SUCCESS}
          onClick={() => handleQuestionCompletion(COMPLETED)}
        >
          Next
        </Button>
      </div>
      <CompletionDialog
        finalResults={finalResults}
        handleClose={handleClose}
        isOpen={isComplete}
      />
    </>
  );
}
