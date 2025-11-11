import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import MovieCard from "../components/MovieCard";

const API_KEY = "96b9832c1e2ecd069688c4ec031c06b9";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchPopular() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`);
  const json = await res.json();
  return json.results;
}

async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}&page=1`
  );
  const json = await res.json();
  return json.results;
}

export default function MoviesScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const list = await fetchPopular();
      setMovies(list);
      setLoading(false);
    })();
  }, []);

  const onSearch = async () => {
    setLoading(true);
    const list = q ? await searchMovies(q) : await fetchPopular();
    setMovies(list);
    setLoading(false);
  };

  if (loading)
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#0096FF" />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Buscar película..."
          value={q}
          onChangeText={setQ}
          style={styles.input}
          placeholderTextColor="#9AA0A6"
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(m) => String(m.id)}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate("Detail", { movie: item })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181C20",
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2429",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#E5E5E5",
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  searchButton: {
    backgroundColor: "#d53ca3",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  list: {
    paddingBottom: 20,
  },
});