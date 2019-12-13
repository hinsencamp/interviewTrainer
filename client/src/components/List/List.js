import React, { useEffect } from "react";

import useGlobalState from "utils/dataStore";
import { Pane, Text, Heading } from "evergreen-ui";
import { Remarkable } from "remarkable";
var md = new Remarkable("commonmark");

export default function List() {
  const { questions, setQuestions } = useGlobalState();

  useEffect(() => {
    const searchTerm = "javaScript";
    setQuestions(searchTerm);
  }, []);

  return (
    <div>
      {questions.map((question, index) => (
        <Pane key={index} background="tint1" padding={24} marginBottom={16}>
          <Heading size={400}>{question.question}</Heading>
          <Text
            // TODO: fix security concern related to XSS
            dangerouslySetInnerHTML={{ __html: md.render(question.answer) }}
          />
        </Pane>
      ))}
    </div>
  );
}
