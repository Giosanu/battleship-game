import { StyleSheet } from "react-native";
import { GRID_SIZE, TILE_SIZE } from "src/constants/boardMetrics";

export const boardStyle = StyleSheet.create({
  container: {
    width: GRID_SIZE * TILE_SIZE + 2,
    height: GRID_SIZE * TILE_SIZE + 2,
    marginBottom: 30,
    borderWidth: 1,
  },
  board: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});
