import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
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
      <Modal visible={show} animationType="slide">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="input something"
            onChangeText={addText}
            value={enteredText}
          />
          <View style={styles.buttonContainer}>
            <Button style="auto" title="add goal" onPress={addHandler} />
            <Button
              style="auto"
              title="cancel"
              onPress={() => setShow(false)}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.listContainer}>
        {goalLists.map((goal) => {
          return (
            <View style={styles.item}>
              <Pressable
                android_ripple={{ color: "#dddddd" }}
                style={({ pressed }) => pressed && styles.pressItem}
                onPress={() => {
                  onDeleteItem(goal.id);
                }}
              >
                <Text key={goal.id}>{goal.text}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    // flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  textInput: {
    borderColor: "#345beb",
    borderWidth: 2,
    width: "70%",
    padding: 8,
  },
  listContainer: {
    flex: 1,
    padding: 100,
    alignItems: "center",
  },
  item: {
    borderColor: "#345beb",
    borderWidth: 2,
    borderRadius: 3,
    margin: 5,
    padding: 5,
    width: "80%",
    backgroundColor: "#5edacc",
  },
  pressItem: {
    opacity: 0.5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
});
