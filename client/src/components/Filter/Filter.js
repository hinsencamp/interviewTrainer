import React, { useState, useEffect } from "react";
import { SearchInput } from "evergreen-ui";
import useGlobalState from "utils/dataStore";
import styles from "./Filter.module.scss";

export default function Filter() {
  const { searchTerm, setQuestions } = useGlobalState();
  const [input, setInput] = useState(searchTerm);

  useEffect(() => {
    // TODO: how to inform filters to set search term as soon as the async function is complete
    // setInput(searchTerm);
    console.log("searchTerm", searchTerm);
  }, []);

  const handleChange = value => {
    setQuestions(value);
    setInput(value);
  };

  return (
    <div className={styles.filter}>
      <SearchInput onChange={e => handleChange(e.target.value)} value={input} />
    </div>
  );
}
