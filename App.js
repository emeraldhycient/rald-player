import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AllMusics from "./screens/allMusics";
import PlayScreen from "./screens/playScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="list" component={AllMusics} />
        <Stack.Screen name="playscreen" component={PlayScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
  },
});
