import React from "react";
import { View, Pressable, StyleSheet } from "react-native";

type Props = {
  row: number;
  col: number;
};

export const Cell: React.FC<Props> = ({ row, col }) => {
  const handlePress = () => {
    console.log(`Pressed cell at [${row}, ${col}]`);
  };

  return (
    <Pressable style={styles.cell} onPress={handlePress}>
      <View />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 30,
    height: 30,
    margin: 1,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: "#aaa",
  },
});
