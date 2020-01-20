import React from "react";

import { Card, Elevation, Tag } from "@blueprintjs/core";

interface IResource {
  headline: string;
  resources: string[];
}
//TODO:DATA DISPLAY change resources to objects with link and title.
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
