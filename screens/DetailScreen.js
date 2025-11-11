import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { IMAGE_BASE_URL } from "../services/tmdbService";

export default function DetailScreen({ route }) {
  const { movie } = route.params;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      {movie.tagline ? <Text style={styles.tagline}>{movie.tagline}</Text> : null}
      <Text style={styles.overview}>{movie.overview}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>
          <Text style={styles.label}>Fecha de estreno:</Text> {movie.release_date}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Rating:</Text> {movie.vote_average} / 10
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181C20",
    padding: 20,
  },
  poster: {
    width: 220,
    height: 330,
    borderRadius: 12,
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#E5E5E5",
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: "center",
    color: "#9AA0A6",
  },
  overview: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    color: "#C0C0C0",
    paddingHorizontal: 10,
  },
  detailsContainer: {
    alignItems: "center",
  },
  detail: {
    fontSize: 16,
    marginTop: 6,
    color: "#E5E5E5",
  },
  label: {
    color: "#ffffffff",
    fontWeight: "600",
  },
});