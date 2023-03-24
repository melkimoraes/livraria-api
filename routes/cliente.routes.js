import express from "express";
import ClienteController from "../controllers/cliente.controller.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", authorize("admin"), ClienteController.createCliente);
router.get("/:id", authorize("admin"), ClienteController.getCliente);
router.get("/", authorize("admin"), ClienteController.getClientes);
router.put("/", authorize("admin", "cliente"), ClienteController.updateCliente);
router.delete("/:id", authorize("admin"), ClienteController.deleteCliente);

export default router;
