// filepath: /c:/Users/Mr. VT/Documents/app seguimiento/server/index.js
import express from "express";
import { fileURLToPath } from 'url';
import { exec, execSync } from "child_process";
import { dirname } from 'path';
import process from "process";
import path from 'path';
import ReactEngine from "react-engine";
import dotenv from "dotenv";
import crypto from "crypto";
import { isAuthenticated } from "./mod/auth.js";
import router from "./mod/routes.js";
import session from "express-session";

// Inicializaciones
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuraciones
dotenv.config({ path: "server/env/.env" });
app.set("port", process.env.PORT || 3000);
app.set('trust proxy', Boolean(process.env.TRUST_PROXY)); // Ajuste de configuración de proxy

// Configura el motor de vistas con ReactEngine
const engine = ReactEngine.server.create();
app.engine('jsx', engine);
app.set('views', path.join(__dirname, "..", 'public')); // Asegúrate de que esta ruta sea correcta
app.set('view engine', 'jsx');
app.set('view', ReactEngine.expressView);

// Configurar sesiones
app.use(session({
  secret: crypto.randomUUID(),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Ajusta esto según sea necesario (true si usas HTTPS)
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(isAuthenticated);

// Archivo de rutas
app.use("/", router);
app.use('/public/css', express.static(path.join('public', 'css')));

// Iniciar servidor
app.listen(app.get("port"), () => {
  console.log("Servidor iniciado______________________");
  console.log("Puerto: ", app.get("port"));
  try {
    // Obtener la IP pública sin mostrar la barra de progreso
    const ip = execSync("curl -s ifconfig.me").toString().trim();
    console.log("IP pública: ", ip);

    // Iniciar Localtunnel una vez que el servidor esté corriendo
    const localtunnel = exec(`lt --port ${app.get("port")}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al iniciar Localtunnel: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error en stderr: ${stderr}`);
        return;
      }
      console.log(`Localtunnel output: ${stdout}`);
    });

    // Capturar la salida de Localtunnel
    localtunnel.stdout.on('data', (data) => {
      const urlMatch = data.match(/https:\/\/[a-zA-Z0-9\-_]+\.loca\.lt/);
      if (urlMatch) {
        console.log(`Localtunnel URL: ${urlMatch[0]}`);
        console.log("_______________LOG______________________");
        console.log("");
      }
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});