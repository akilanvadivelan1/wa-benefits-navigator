/**
 * App shell and navigation.
 *
 * A native stack mirrors the web flow: Home -> Quiz -> Results -> Detail,
 * plus a Browse screen (reachable from Home and Results) that also opens
 * Detail. All state lives in navigation params and component memory, so there
 * is no server and nothing is persisted, matching the web app's privacy model.
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import type { RootStackParamList } from "./src/navigation.ts";
import { HomeScreen } from "./src/screens/HomeScreen.tsx";
import { QuizScreen } from "./src/screens/QuizScreen.tsx";
import { ResultsScreen } from "./src/screens/ResultsScreen.tsx";
import { DetailScreen } from "./src/screens/DetailScreen.tsx";
import { BrowseScreen } from "./src/screens/BrowseScreen.tsx";
import { colors } from "./src/theme.ts";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: "700" },
            headerBackTitle: "Back",
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "WA Benefits Navigator" }} />
          <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: "Find programs" }} />
          <Stack.Screen name="Results" component={ResultsScreen} options={{ title: "Your results" }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Program details" }} />
          <Stack.Screen name="Browse" component={BrowseScreen} options={{ title: "All programs" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
