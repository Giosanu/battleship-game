import React from "react";
import { View, StyleSheet } from "react-native";
import {Cell} from "../Cell"
import { BoardProps } from "./Board.types";

const GRID_SIZE = 10;

export const Board = (props: BoardProps) => {
  const { type } = props;
  return (
    <View style={styles.board}>
      {Array.from({ length: GRID_SIZE }).map((_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: GRID_SIZE }).map((_, col) => (
            <Cell key={`${row}-${col}`} row={row} col={col} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    padding: 10,
    aspectRatio: 1,
  },
  row: {
    flexDirection: "row",
  },
});
