import React, { useEffect, useState } from "react";

// Hooks
import { useLocalStorage } from "utils/hooks";
import { useIndex } from "./useIndex";
import { useResultCounter } from "./useResultCounter";

// UI
import { Button, Intent } from "@blueprintjs/core";
import { QuestionCard } from "components/QuestionCard";
import CompletionDialog from "./CompletionDialog";
import { COMPLETED, FAILED } from "./resultConst";

import style from "./Trainer.module.scss";

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
      <QuestionCard
        className={!currentQuestion && "bp3-skeleton"}
        question={currentQuestion && currentQuestion.question}
        answer={currentQuestion && currentQuestion.answer}
      >
        <QuestionCard.Footer>
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
        </QuestionCard.Footer>
      </QuestionCard>
      <CompletionDialog
        finalResults={finalResults}
        handleClose={handleClose}
        isOpen={isComplete}
      />
    </>
  );
}
