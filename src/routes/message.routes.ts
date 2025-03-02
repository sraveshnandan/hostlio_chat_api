import { Router } from "express";
import { HandleCreateMessage } from "../controllers/message.controllers";

const router = Router();

router.route("/message").post(HandleCreateMessage);

export default router;
