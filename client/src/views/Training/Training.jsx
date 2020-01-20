import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useLocalStorage } from "utils/hooks";

import queryString from "query-string";

import View from "components/View";
import { Trainer } from "components/Trainer";
import { capitalize } from "utils/helpers";

import useGlobalState from "utils/dataStore";

// import style from "./Training.module.scss";

export default function Training() {
  const { trainingSet, fetchTrainingSet } = useGlobalState();
  const {
    storedValue: randomSeed,
    removeValue: removeSeed,
    setValue: setSeed
  } = useLocalStorage("trainingSeed");
  const { type: trainingType } = useParams();

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    if (!randomSeed) {
      setSeed(Math.round(Math.random() * 100000));
    }
    fetchTrainingSet(5, randomSeed);
  }, []);

  useEffect(() => {
    !trainingSet && removeSeed();
  }, [trainingSet]);

  useEffect(() => {
    console.log(trainingSet);
  }, [trainingSet]);

  return (
    <View>
      <View.Header headline={`${capitalize(trainingType)} Training`} />
      <View.Body>
        <Trainer trainingSet={trainingSet} />
      </View.Body>
    </View>
  );
}
