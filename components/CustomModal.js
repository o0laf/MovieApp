import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

export default function CustomModal({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  type = "info",
}) {
  const getColor = () => {
    switch (type) {
      case "error":
        return "#F85E9F";
      case "confirm":
        return "#F85E9F";
      default:
        return "#F85E9F";
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCancel}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.6}
    >
      <View style={styles.modal}>
        <Text style={[styles.title, { borderBottomColor: getColor() }]}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonsContainer}>
          {onCancel && (
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
          )}
          {onConfirm && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: getColor() }]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#1E2429",
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2E3439",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#fff", 
    borderBottomWidth: 2,
    paddingBottom: 4,
    alignSelf: "stretch",
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 22,
    color: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "#3A4046",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});