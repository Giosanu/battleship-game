import { StyleSheet } from "react-native";

export const mainSceneStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  floatingButtonsWrapper: {
    position: 'absolute',
    bottom: 100,
    right: 0,
  },
  button: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRightWidth:0,
    padding: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5, 
    marginBottom: 20,
  }
})