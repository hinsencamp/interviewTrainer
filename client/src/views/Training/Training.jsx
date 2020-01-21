import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "utils/hooks";

import { Tag } from "@blueprintjs/core";

import View from "components/View";
import { Trainer } from "components/Trainer";
import { capitalize } from "utils/helpers";

import useGlobalState from "utils/dataStore";

import style from "./Training.module.scss";

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

  useEffect(() => {}, [trainingSet]);

  return (
    <View>
      <View.Header headline={`${capitalize(trainingType)} Training Session`}>
        {["JavaScript", "CSS", "Node"].map((tagNode, id) => (
          <Tag key={id} className={style.typeTag}>
            {tagNode}
          </Tag>
        ))}
      </View.Header>
      <View.Body className={style.noOverflow}>
        <Trainer trainingSet={trainingSet} />
      </View.Body>
    </View>
  );
}
