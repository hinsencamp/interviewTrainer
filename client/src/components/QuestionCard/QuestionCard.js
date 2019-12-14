import React from "react";
import { Pane, Text, Heading } from "evergreen-ui";
import { Remarkable } from "remarkable";

var md = new Remarkable("commonmark");

// TODO: Make showing solution optional
// TODO: fix security concern related to XSS

export function QuestionCard({ question, answer }) {
  return (
    <Pane background="tint1" padding={24} marginBottom={16}>
      <Heading size={400}>{question}</Heading>
      <Text dangerouslySetInnerHTML={{ __html: md.render(answer) }} />
    </Pane>
  );
}
