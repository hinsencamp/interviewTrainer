import React from "react";

import { Card, Elevation } from "@blueprintjs/core";

import Paragraph from "../Paragraph";

interface ISolution {
  solution: string;
}

export default function Solution({ solution, ...props }: ISolution) {
  return (
    <Card elevation={Elevation.ONE} {...props}>
      <Paragraph headline="Solution" solution={solution} />
    </Card>
  );
}
