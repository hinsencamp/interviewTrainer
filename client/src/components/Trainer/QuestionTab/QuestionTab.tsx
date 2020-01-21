import React from "react";

import { Card, Elevation } from "@blueprintjs/core";

// import style from "./QuestionTab.module.scss";

interface IQuestion {
  question: string;
  tags: string[];
}

export default function Question({ question, tags, ...props }: IQuestion) {
  return (
    <Card elevation={Elevation.ONE} {...props}>
      <h2 className="bp3-heading">{question}</h2>
    </Card>
  );
}
