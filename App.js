import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  Pressable,
  Modal,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [enteredText, setEnteredText] = useState("");
  const [goalLists, setGoalLists] = useState([{ text: "nonono", id: "1" }]);
  const [show, setShow] = useState(true);

  function addText(newText) {
    setEnteredText(newText);
  }

  function addGoal(enteredText) {
    setGoalLists((prev) => [
      ...prev,
      { text: enteredText, id: Math.random().toString() },
    ]);
  }

  function addHandler() {
    addGoal(enteredText);
    setEnteredText("");
  }

  function onDeleteItem(id) {
    setGoalLists((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <View style={styles.appContainer}>
      {/* <Modal visible={show} animationType="slide" style={styles.modalContainer}> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="input something here!!"
          onChangeText={addText}
          value={enteredText}
        />
        <View style={styles.buttonContainer}>
          <Button style="auto" title="add goal" onPress={addHandler} />
          <Button style="auto" title="cancel" onPress={() => setShow(false)} />
        </View>
      </View>
      {/* </Modal> */}
      <View style={styles.goalsContainer}>
        <FlatList
          data={goalLists}
          renderItem={(itemData) => {
            return (
              <View style={styles.item}>
                <Pressable
                  // android_ripple只对安卓有用，ios需要下一行的style来给press后增加一些animation
                  android_ripple={{ color: "#dddddd" }}
                  style={({ pressed }) => pressed && styles.pressItem}
                  onPress={() => {
                    onDeleteItem(itemData.item.id);
                  }}
                >
                  <Text style={styles.goalText}>{itemData.item.text}</Text>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  modalContainer: {
    // backgroundColor: "#bcc5e6",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  textInput: {
    borderColor: "#345beb",
    borderWidth: 2,
    width: "70%",
    padding: 8,
  },
  goalsContainer: {
    flex: 3,
    padding: 100,
  },
  item: {
    borderColor: "#345beb",
    borderWidth: 2,
    borderRadius: 6,
    margin: 5,

    width: "90%",
    backgroundColor: "#5edacc",
    height: 70,
  },
  pressItem: {
    opacity: 0.5,
  },
  buttonContainer: {
    width: "50%",
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  goalText: {
    color: "white",
    fontSize: 40,
    padding: 9,
  },
});
