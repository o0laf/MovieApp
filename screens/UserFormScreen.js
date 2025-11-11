import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createUser, updateUser } from "../services/db";
import CustomModal from "../components/CustomModal";

export default function UserFormScreen({ navigation, route }) {
  const editingUser = route.params?.user;
  const [name, setName] = useState(editingUser?.name || "");
  const [username, setUsername] = useState(editingUser?.username || "");
  const [password, setPassword] = useState(editingUser?.password || "");
  const [role, setRole] = useState(editingUser?.role || "user");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ visible: false, title: "", message: "", type: "info" });

  const onSave = async () => {
    if (!name || !username || !password) {
      setModal({
        visible: true,
        title: "Completar",
        message: "Por favor, completá todos los campos.",
        type: "error",
      });
      return;
    }
    setLoading(true);
    try {
      if (editingUser) {
        await updateUser({ id: editingUser.id, name, username, password, role });
      } else {
        await createUser({ name, username, password, role });
      }
      navigation.goBack();
    } catch (err) {
      setModal({
        visible: true,
        title: "Error",
        message: err.message || "No se pudo guardar.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.formTitle}>
            {editingUser ? "Editar datos" : "Crear nuevo usuario"}
          </Text>

          <TextInput
            placeholder="Nombre completo"
            placeholderTextColor="#9AA0A6"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Nombre de usuario"
            placeholderTextColor="#9AA0A6"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#9AA0A6"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Text style={styles.label}>Rol:</Text>
          <View style={styles.pickerWrapper}>
  <Picker
    selectedValue={role}
    onValueChange={(v) => setRole(v)}
    style={styles.picker}
    dropdownIconColor="#E5E5E5"
    itemStyle={{ color: "#fff", backgroundColor: "#252B30" }}
  >
    <Picker.Item label="Usuario" value="user" />
    <Picker.Item label="Administrador" value="admin" />
  </Picker>
</View>

          <View style={styles.buttonWrapper}>
            <Button
              title={loading ? "Guardando..." : "Guardar"}
              onPress={onSave}
              color="#FF3CAC"
            />
          </View>
        </View>

        <CustomModal
          visible={modal.visible}
          title={modal.title}
          message={modal.message}
          type={modal.type}
          onConfirm={() => setModal({ ...modal, visible: false })}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181C20",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#1E2429",
    padding: 20,
    borderRadius: 12,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#E5E5E5",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2C333A",
    backgroundColor: "#252B30",
    color: "#E5E5E5",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  label: {
    fontWeight: "600",
    color: "#E5E5E5",
    marginBottom: 6,
    marginTop: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#2C333A",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#252B30",
  },
  picker: {
    color: "#E5E5E5",
  },
  buttonWrapper: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
  },
});
