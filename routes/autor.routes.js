import express from "express";
import AutorController from "../controllers/autor.controller.js";

const router = express.Router();

router.post("/", AutorController.createAutor);
router.get("/:id", AutorController.getAutor);
router.get("/", AutorController.getAutores);
router.put("/", AutorController.updateAutor);
router.delete("/:id", AutorController.deleteAutor);

export default router;
