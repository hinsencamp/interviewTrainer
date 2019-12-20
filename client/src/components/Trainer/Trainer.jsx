import React, { useEffect, useState } from "react";

// Hooks
import { useLocalStorage } from "utils/hooks";
import { useIndex } from "./useIndex";
import { useResultCounter } from "./useResultCounter";

// UI
import { Button, Intent } from "@blueprintjs/core";

import { QuestionCard } from "components/QuestionCard";
import { COMPLETED, FAILED } from "./resultConst";

function CompletionPanel({ onCompletion }) {
  return (
    <div>
      <Button intent={Intent.SUCCESS} onClick={() => onCompletion(COMPLETED)}>
        Answered
      </Button>
      <Button onClick={() => onCompletion(FAILED)}>No Idea</Button>
    </div>
  );
}

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
    }
  }

  return (
    <div>
      {!currentQuestion ? (
        "loading"
      ) : (
        <>
          <QuestionCard
            question={currentQuestion.question}
            answer={currentQuestion.answer}
          >
            <QuestionCard.Footer>
              <CompletionPanel onCompletion={handleQuestionCompletion} />
              {/* show complete button */}
            </QuestionCard.Footer>
          </QuestionCard>
        </>
      )}
    </div>
  );
}
