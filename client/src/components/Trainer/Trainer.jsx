import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "evergreen-ui";

import { QuestionCard } from "components/QuestionCard";
import useGlobalState from "utils/dataStore";

//TODO: create constants for types
const COMPLETED = "COMPLETED";
const FAILED = "FAILED";

function CompletionPanel({ onCompletion, questionIndex }) {
  return (
    <div>
      <Button onClick={() => onCompletion(questionIndex, COMPLETED)}>
        Answered
      </Button>
      <Button onClick={() => onCompletion(questionIndex, FAILED)}>
        No Idea
      </Button>
    </div>
  );
}

function useTrainingsSet(questions, startIndex = 0) {
  const [trainingsSet] = useState(questions);
  const [currentQuestion, setCurrentQuestion] = useState({
    source: trainingsSet[startIndex],
    index: startIndex
  });
  const [finalQuestionReached, setfinalQuestionReached] = useState(false);
  const finalQuestionIndex = questions.length - 1;

  function nextQuestion() {
    const newIndex = currentQuestion.index + 1;

    if (newIndex > finalQuestionIndex) {
      setfinalQuestionReached(true);
    }

    setCurrentQuestion({
      source: trainingsSet[newIndex],
      index: newIndex
    });
  }

  return {
    currentQuestion,
    nextQuestion,
    finalQuestionReached
  };
}

function useResultCounter() {
  const [finalResults, setFinalResults] = useState({
    [COMPLETED]: [],
    [FAILED]: []
  });

  function handleResult(index, completionStatus) {
    setFinalResults({
      ...finalResults,
      [completionStatus]: [...finalResults[completionStatus], index]
    });
  }
  return {
    finalResults,
    handleResult
  };
}

//TODO: persist trainingsSet in local storage when entering the trainer
//TODO: handle ids not complete question objects

export function Trainer(props) {
  let { questionType } = useParams();

  const globalStates = useGlobalState();
  const {
    currentQuestion,
    finalQuestionReached,
    nextQuestion
  } = useTrainingsSet(globalStates[questionType]);
  const { finalResult, handleResult } = useResultCounter();

  function handleCompletion(questionIndex, comletionStatus) {
    handleResult(questionIndex, comletionStatus);
    nextQuestion();
  }

  return (
    <div>
      {finalQuestionReached && <div>done</div>}
      {!finalQuestionReached && (
        <QuestionCard
          question={currentQuestion.source.question}
          answer={currentQuestion.source.answer}
        />
      )}
      <CompletionPanel
        questionIndex={currentQuestion.index}
        onCompletion={handleCompletion}
      ></CompletionPanel>
    </div>
  );
}
