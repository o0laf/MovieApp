import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import UserMenu from "./components/UserMenu";
import LoginScreen from "./screens/LoginScreen";
import AdminUsersScreen from "./screens/AdminUsersScreen";
import UserFormScreen from "./screens/UserFormScreen";
import MoviesScreen from "./screens/MoviesScreen";
import DetailScreen from "./screens/DetailScreen";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user, loadingInit } = useContext(AuthContext);

  if (loadingInit) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0e1012ff" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {!user ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : user.role === "admin" ? (
        <>
          <Stack.Screen
            name="AdminUsers"
            component={AdminUsersScreen}
            options={{
              title: "Gestión de Usuarios",
              headerRight: () => <UserMenu color="#FFFFFF" />,
            }}
          />
          <Stack.Screen
            name="UserForm"
            component={UserFormScreen}
            options={{
              title: "Gestión de Usuarios",
              headerTintColor: "#FFFFFF",
            }}
          />
          <Stack.Screen
            name="Movies"
            component={MoviesScreen}
            options={{
              title: "Películas",
              headerRight: () => <UserMenu color="#FFFFFF" />,
            }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              title: "Detalles",
              headerTintColor: "#FFFFFF",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Movies"
            component={MoviesScreen}
            options={{
              title: "Películas",
              headerRight: () => <UserMenu color="#FFFFFF" />,
            }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              title: "Detalles",
              headerTintColor: "#FFFFFF",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}