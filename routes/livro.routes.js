import express from "express";
import LivroController from "../controllers/livro.controller.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", authorize("admin"), LivroController.createLivro);
router.get("/info", authorize("admin"), LivroController.getLivrosInfo);
router.get("/:id", authorize("admin", "cliente"), LivroController.getLivro);
router.get("/", authorize("admin", "cliente"), LivroController.getLivros);
router.put("/", authorize("admin"), LivroController.updateLivro);
router.delete("/:id", authorize("admin"), LivroController.deleteLivro);
router.post("/info", authorize("admin"), LivroController.createLivroInfo);
router.put("/info", authorize("admin"), LivroController.updateLivroInfo);
router.delete("/info/:id", authorize("admin"), LivroController.deleteLivroInfo);
router.post(
  "/info/:id/avaliacao",
  authorize("admin", "cliente"),
  LivroController.createLivroAvaliacao
);
router.delete(
  "/info/:id/avaliacao/:index",
  authorize("admin"),
  LivroController.deleteLivroAvaliacao
);

export default router;
