import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { Trainer } from "components/Trainer";

import useGlobalState from "utils/dataStore";

export default function Training(props) {
  const { trainingSet, fetchTrainingSet } = useGlobalState();
  const { search } = useLocation();

  useEffect(() => {
    const ids = JSON.parse(queryString.parse(search).ids);
    fetchTrainingSet(ids);
  }, []);

  return (
    <div>
      <Trainer trainingSet={trainingSet} />
    </div>
  );
}
