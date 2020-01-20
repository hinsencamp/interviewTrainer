import React from "react";
import { Remarkable } from "remarkable";

import style from "./Paragraph.module.scss";

export default function Paragraph({ headline, solution }) {
  var md = new Remarkable("commonmark");
  return (
    <div className={style.paragraph}>
      <h4 className="bp3-heading">{headline}</h4>
      <div dangerouslySetInnerHTML={{ __html: md.render(solution) }} />
    </div>
  );
}
