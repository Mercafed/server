// importaciones
import { Router } from "express";

// inicializaciones
const router = Router();

// rutas
router.get("/", (req, res) => {
  res.send("Hola Mundo");
  console.log(req.ip ,"abrio url:", req.url);
});

router.get("/login", (req, res) => {
    res.render("login");
    console.log(req.ip, "abrio url:", "'"+req.url+ "'");
})

router.post("/login", (req, res) => {
    console.log(req.body);
    res.send("Datos recibidos");
})

export default router;