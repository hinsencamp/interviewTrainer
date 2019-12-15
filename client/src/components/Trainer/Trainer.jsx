import React, { useEffect, useState } from "react";

// Hooks
import { useParams } from "react-router-dom";
import { useLocalStorage } from "utils/hooks";
import useGlobalState from "utils/dataStore";
import { useIndex } from "./useIndex";
import { useResultCounter } from "./useResultCounter";

// UI
import { Button } from "evergreen-ui";
import { QuestionCard } from "components/QuestionCard";

import { COMPLETED, FAILED } from "./resultConst";

function CompletionPanel({ onCompletion }) {
  return (
    <div>
      <Button onClick={() => onCompletion(COMPLETED)}>Answered</Button>
      <Button onClick={() => onCompletion(FAILED)}>No Idea</Button>
    </div>
  );
}

// TODO: persist index of question set
//TODO: handle ids not complete question objects

function useTrainingSet(questionType) {
  const { storedValue, setValue, removeValue } = useLocalStorage(questionType);
  const globalStates = useGlobalState();

  const [trainingSet] = useState(
    () =>
      (!!globalStates[questionType].length && globalStates[questionType]) ||
      storedValue
  );

  useEffect(() => {
    if (!!globalStates[questionType].length) {
      setInLocalStorage(globalStates[questionType]);
    }
  }, []);

  function setInLocalStorage(trainingSet, index) {
    setValue(trainingSet);
  }

  function removeFromLocalStorage() {
    removeValue();
  }

  return {
    trainingSet,
    setInLocalStorage,
    removeFromLocalStorage
  };
}

export function Trainer(props) {
  const { storedValue, setValue, removeValue } = useLocalStorage(
    "currentIndex"
  );
  const { questionType } = useParams();
  const startIndex = storedValue || 0;
  const { trainingSet, removeFromLocalStorage } = useTrainingSet(questionType);
  const [trainingCompleted, setTrainingCompleted] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(
    trainingSet[startIndex]
  );
  const { currentIndex, finalIndex, nextIndex } = useIndex(
    startIndex,
    trainingSet.length
  );

  function nextQuestion() {
    nextIndex();
    setValue(currentIndex);
    setCurrentQuestion(trainingSet[currentIndex]);
  }

  function handleTrainingCompletion() {
    setTrainingCompleted(true);
    removeFromLocalStorage();
    // handleResult(questionIndex, comletionStatus);
    removeValue();
  }

  function handleQuestionCompletion(comletionStatus) {
    if (currentIndex !== finalIndex) {
      nextQuestion();
    } else {
      handleTrainingCompletion(comletionStatus);
    }
  }

  return (
    <div>
      {!trainingCompleted && currentQuestion && (
        <div>
          <QuestionCard
            question={currentQuestion.question}
            answer={currentQuestion.answer}
          />
          <CompletionPanel
            onCompletion={handleQuestionCompletion}
          ></CompletionPanel>
        </div>
      )}
    </div>
  );
}
