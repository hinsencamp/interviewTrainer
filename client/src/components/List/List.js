import React, { useEffect } from "react";
import { QuestionCard } from "components/QuestionCard";
import useGlobalState from "utils/dataStore";

export default function List() {
  const { questions, searchTerm, setQuestions } = useGlobalState();

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    setQuestions(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      {questions.map(({ question, answer }, index) => (
        <QuestionCard key={index} question={question} answer={answer} />
      ))}
    </div>
  );
}
