import express from "express";
import { getModuleByName } from "../controllers/moduleController.js";

const router = express.Router();

router.get("/:name", getModuleByName);

export default router;
