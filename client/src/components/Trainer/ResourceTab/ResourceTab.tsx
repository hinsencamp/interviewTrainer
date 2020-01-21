import React from "react";

import { Card, Elevation } from "@blueprintjs/core";

interface IResource {
  headline: string;
  resources: string[];
}

export default function ResourceTab({
  headline,
  resources,
  ...props
}: IResource) {
  return (
    <Card elevation={Elevation.ONE} {...props}>
      <h2 className="bp3-heading">{headline}</h2>
      <ul>
        {resources.map((resourceNode: String, id) => (
          <li key={id}>{resourceNode}</li>
        ))}
      </ul>
    </Card>
  );
}
