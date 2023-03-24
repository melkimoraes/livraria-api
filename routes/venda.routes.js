import express from "express";
import VendaController from "../controllers/venda.controller.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", authorize("admin", "cliente"), VendaController.createVenda);
router.get("/:id", authorize("admin", "cliente"), VendaController.getVenda);
router.get("/", authorize("admin"), VendaController.getVendas);
router.put("/", authorize("admin"), VendaController.updateVenda);
router.delete("/:id", authorize("admin"), VendaController.deleteVenda);

export default router;
