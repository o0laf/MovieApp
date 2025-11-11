import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";

export default function UserMenu({ color = "#FFFFFF" }) {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    setVisible(false);
    logout();
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.iconButton}>
        <Ionicons name="person-circle-outline" size={28} color={color} />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.menuContainer}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.username}>{user?.username}</Text>
            <View style={styles.separator} />
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={18} color="#FF3CAC" />
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: { padding: 4 },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  menuContainer: {
    backgroundColor: "#181C20",
    borderRadius: 10,
    marginTop: 60,
    marginRight: 10,
    padding: 14,
    width: 180,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  name: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  username: { fontSize: 14, color: "#9AA0A6", marginBottom: 10 },
  separator: { height: 1, backgroundColor: "#333", marginVertical: 8 },
  logoutButton: { flexDirection: "row", alignItems: "center", gap: 6 },
  logoutText: { color: "#FF3CAC", fontWeight: "600" },
});
