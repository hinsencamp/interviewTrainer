import React from "react";

import { Remarkable } from "remarkable";

import { Text } from "@blueprintjs/core";

import { Card, Elevation, Tag } from "@blueprintjs/core";

import style from "./QuestionCard.module.scss";

var md = new Remarkable("commonmark");

function MockParagraph({ headline, children }) {
  return (
    <div className={style.paragraph}>
      <h4 className="bp3-heading">{headline}</h4>
      <Text>{children}</Text>
    </div>
  );
}

function Paragraph({ headline, contentHtml }) {
  return (
    <div className={style.paragraph}>
      <h4 className="bp3-heading">{headline}</h4>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}

export function QuestionCard({
  // category,
  question,
  // answer,
  children,
  ...props
}) {
  return (
    <Card elevation={Elevation.ONE} {...props}>
      <h2 className="bp3-heading">{question}</h2>

      {/* <MockParagraph headline={"Context"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliquat enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo.
      </MockParagraph>

      <Paragraph headline="Technical Details" contentHtml={md.render(answer)} />
      <MockParagraph headline={"Project Implication"}>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliquat enim
        ad minim veniam.
      </MockParagraph>
      <MockParagraph headline={"Further Resources"}>
        <ul>
          <li>
            <Text>incididunt ut labore et dolore</Text>
          </li>
          <li>
            <Text>dolore magna</Text>
          </li>
        </ul>
      </MockParagraph> */}
      {children}
    </Card>
  );
}

function Footer(props) {
  return <div>{props.children}</div>;
}

QuestionCard.Footer = Footer;
