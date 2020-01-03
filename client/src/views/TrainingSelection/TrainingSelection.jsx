import React from "react";
import { Link } from "react-router-dom";
import routes from "utils/routes";

import { Card, Elevation } from "@blueprintjs/core";
import View from "components/View";

import style from "./TrainingSection.module.scss";

function TrainingCard({ name = "", link = {} }) {
  return (
    <Card
      className={style.trainingCard}
      interactive={true}
      elevation={Elevation.TWO}
    >
      <Link
        to={{ ...link, pathname: link.pathname + `/${name.toLowerCase()}` }}
      >
        {name}
      </Link>
    </Card>
  );
}

export default function TrainingSelection() {
  const foo = {
    pathname: routes.trainer,
    search: `?ids=${JSON.stringify([
      "hZDra28ByVzq0AuwY_p_",
      "hpDra28ByVzq0AuwY_p_"
    ])}`
  };

  return (
    <View>
      <View.Header headline={"Training Selection"} />
      <View.Body>
        <div className={style.trainingTypes}>
          <TrainingCard name="Frontend" link={foo} />
          <TrainingCard name="FullStack" />
          <TrainingCard name="Backend" />
          <TrainingCard name="Design" />
        </div>
      </View.Body>
    </View>
  );
}
