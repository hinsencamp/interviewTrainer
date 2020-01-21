import React, { useState } from "react";

import { Tabs, Tab } from "@blueprintjs/core";

import QuestionTab from "../QuestionTab";
import SolutionTab from "../SolutionTab";
import ResouceTab from "../ResourceTab";
import { capitalize } from "utils/helpers";

import style from "./TabGroup.module.scss";

interface QuestionObject {
  question: string;
  answer: string;
}

interface StringMap {
  [key: string]: any;
}
interface ITabGroup {
  question: QuestionObject;
  classes: string[];
}

export default function TabGroup({ question, classes }: ITabGroup) {
  const [selectedTabId, setSelectedTabId] = useState("question");
  const panels: StringMap = {
    question: (
      <QuestionTab
        tags={["JavaScript", "CSS", "Node"]}
        question={question && question.question}
      />
    ),
    solution: <SolutionTab solution={question && question.answer} />,
    resouces: <ResouceTab headline="Resources" resources={["link1", "link2"]} />
  };

  return (
    <>
      <Tabs
        id="navbar"
        selectedTabId={selectedTabId}
        className={[style.questionTab, ...classes].join(" ")}
        onChange={(navbarTabId: string) => setSelectedTabId(navbarTabId)}
      >
        {Object.keys(panels).map(panelName => (
          <Tab
            key={panelName}
            id={panelName}
            title={capitalize(panelName)}
            panel={panels[panelName]}
          />
        ))}
      </Tabs>

      <Tabs.Expander />
    </>
  );
}
