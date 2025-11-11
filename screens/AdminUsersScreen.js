import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAllUsers, deleteUser } from "../services/db";
import { AuthContext } from "../contexts/AuthContext";
import CustomModal from "../components/CustomModal";

export default function AdminUsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [modal, setModal] = useState({
    visible: false,
    user: null,
    title: "",
    message: "",
    type: "info",
  });

  const load = async () => {
    const all = await getAllUsers();
    setUsers(all);
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", load);
    load();
    return unsub;
  }, [navigation]);

  const handleDelete = (u) => {
    if (u.id === currentUser.id) {
      setModal({
        visible: true,
        title: "No permitido",
        message: "No podés eliminarte a vos mismo.",
        type: "error",
      });
      return;
    }
    setModal({
      visible: true,
      user: u,
      title: "Confirmar eliminación",
      message: `¿Eliminar a ${u.username}?`,
      type: "confirm",
    });
  };

  const confirmDelete = async () => {
    if (modal.user) {
      await deleteUser(modal.user.id);
      load();
    }
    setModal({ visible: false, user: null });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Usuarios</Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => navigation.navigate("UserForm")}
        >
          <Text style={styles.buttonText}>+ Nuevo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>
                {item.name} <Text style={styles.username}>({item.username})</Text>
              </Text>
              <Text style={styles.role}>Rol: {item.role}</Text>
            </View>
            <View style={styles.iconButtons}>
              <TouchableOpacity onPress={() => navigation.navigate("UserForm", { user: item })}>
                <Ionicons name="create-outline" size={22} color="#00FFD1" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <Ionicons name="trash-outline" size={22} color="#F85E9F" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />

      <CustomModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onCancel={() => setModal({ visible: false, user: null })}
        onConfirm={modal.user ? confirmDelete : () => setModal({ visible: false })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181C20",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E5E5E5",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonPrimary: {
    backgroundColor: "#FF3CAC",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E2429",
    padding: 14,
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E5E5E5",
  },
  username: {
    fontSize: 14,
    color: "#9AA0A6",
  },
  role: {
    color: "#9AA0A6",
    marginTop: 2,
  },
  iconButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
});
