import React from "react";

import useGlobalState from "utils/dataStore";
import View from "components/View";

export default function Dashboard() {
  const { user } = useGlobalState();

  return (
    <View>
      <View.Header headline={`Welcome ${user.name}`} />
      <View.Body>{/*  */}</View.Body>
    </View>
  );
}
