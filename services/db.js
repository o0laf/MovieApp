import * as SQLite from "expo-sqlite";

let db;

export const initDB = async () => {
  try {
    db = await SQLite.openDatabaseAsync("appdb.db");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
      );
    `);

    const result = await db.getFirstAsync(
      "SELECT COUNT(*) as count FROM users WHERE username = ?;",
      ["admin"]
    );

    if (result.count === 0) {
      await db.runAsync(
        "INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?);",
        ["Administrador", "admin", "admin123", "admin"]
      );
      console.log("Usuario admin creado por defecto");
    } else {
      console.log("Usuario admin ya existe");
    }

    console.log("Base de datos inicializada correctamente");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
};

export const createUser = async ({ name, username, password, role = "user" }) => {
  try {
    if (!db) await initDB();
    await db.runAsync(
      "INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?);",
      [name, username, password, role]
    );
    console.log("Usuario creado correctamente");
  } catch (error) {
    console.error("Error al crear usuario:", error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    if (!db) await initDB();
    const result = await db.getFirstAsync(
      "SELECT * FROM users WHERE username = ?;",
      [username]
    );
    return result || null;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    if (!db) await initDB();
    const result = await db.getAllAsync("SELECT * FROM users ORDER BY id DESC;");
    return result;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
};

export const updateUser = async ({ id, name, username, password, role }) => {
  try {
    if (!db) await initDB();
    await db.runAsync(
      "UPDATE users SET name = ?, username = ?, password = ?, role = ? WHERE id = ?;",
      [name, username, password, role, id]
    );
    console.log("Usuario actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
};

export const deleteUser = async (id) => {
  try {
    if (!db) await initDB();
    await db.runAsync("DELETE FROM users WHERE id = ?;", [id]);
    console.log("Usuario eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
  }
};