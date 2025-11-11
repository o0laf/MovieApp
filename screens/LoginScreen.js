import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#9AA0A6"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#9AA0A6"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181C20",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#E5E5E5",
    marginBottom: 28,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1E2429",
    color: "#E5E5E5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#FF3CAC",
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  link: {
    color: "#9AA0A6",
    textAlign: "center",
    marginTop: 16,
  },
});