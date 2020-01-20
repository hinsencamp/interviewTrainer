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
}

// TODO: DATA DISPLAY replace mock data with actual data from backend.
export default function TabGroup({ question }: ITabGroup) {
  const [selectedTabId, setSelectedTabId] = useState("question");
  console.log(question);
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
        className={style.questionTab}
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
