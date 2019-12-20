import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";

import View from "components/View";
import { Trainer } from "components/Trainer";
import { capitalize } from "utils/helpers";

import useGlobalState from "utils/dataStore";

// import style from "./Training.module.scss";

export default function Training() {
  const { trainingSet, fetchTrainingSet } = useGlobalState();
  const { search } = useLocation();
  const { type } = useParams();

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    const ids = JSON.parse(queryString.parse(search).ids);
    fetchTrainingSet(ids);
  }, []);

  return (
    <View>
      <View.Header headline={`${capitalize(type)} Training`} />
      <View.Body>
        <Trainer trainingSet={trainingSet} />
      </View.Body>
    </View>
  );
}
