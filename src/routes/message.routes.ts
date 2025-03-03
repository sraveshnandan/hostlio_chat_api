import { Router } from "express";
import {
  HandleCreateMessage,
  HandleGetAllMessagesFromConv,
} from "../controllers/message.controllers";

const router = Router();

router.route("/message").post(HandleCreateMessage);
router.route("/message").get(HandleGetAllMessagesFromConv);

export default router;
