import React from "react";
import View from "components/View";

export default function Skeleton() {
  return (
    <View>
      <View.Header />
      <View.Body>loading...</View.Body>
    </View>
  );
}
