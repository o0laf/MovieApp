# Desarrollo-de-Aplicaciones-Moviles

# 🎬 Proyecto React Native - Detalles de Película (TMDb)

Fue desarrollado con React Native y Expo, e implementa un sistema completo de autenticación, gestión de usuarios y consumo de API externa (The Movie Database).

## Descripción general

La aplicación permite: 
- Registrar y autenticar usuarios mediante una base de datos SQLite local.
- Distinguir entre roles de usuario.
- Visualizar películas populares con sus imágenes, títulos y descripciones.
- Mantener la sesión activa hasta que el usuario cierre sesión manualmente.
  
## Requisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Expo Go (app para Android/iOS que permite probar el proyecto)

## Ejecución

1. Clonar el repositorio:
   git clone https://github.com/o0laf/Desarrollo-de-Aplicaciones-Moviles.git

2. Entrar a la carpeta del proyecto:
   cd MovieApp

3. Instalar dependencias:
   npm install

4. Iniciar la app con Expo:
   npx expo start

5. Escanear el QR con la app de Expo Go (Android/iOS) para ver la aplicación en tu celular.

## Sistema de Autenticación
- Login con validación local usando SQLite.
- Verificación de credenciales almacenadas en la base de datos.
- Persistencia de sesión (el usuario permanece logueado hasta cerrar sesión).
- Redirección según rol: **admin** → Pantalla de Gestión de Usuarios, **user** → Pantalla de Películas (TMDb)

## Panel de Administración (solo Admin)
El usuario con rol administrador puede:
- Crear nuevos usuarios (por defecto con rol user).
- Listar todos los usuarios existentes.
- Editar usuarios (nombre, username, contraseña, rol).
- Eliminar usuarios (excepto a sí mismo).
- Usar modales personalizados para confirmación, errores y advertencias (reemplazando los modales nativos de Expo).

## Sección de Películas (Usuarios estándar)
Los usuarios con rol user pueden:
- Consultar información proveniente de la API de The Movie Database (TMDb).
- Visualizar una lista de películas populares con sus imágenes y detalles.
- Acceder a una pantalla de detalles con descripción, puntuación y carátula.
