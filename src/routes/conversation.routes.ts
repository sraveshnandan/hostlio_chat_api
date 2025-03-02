import { Router } from "express";
import {
  handleCreateConversation,
  handleGetConversationMessages,
} from "../controllers";

const router = Router();

router.route(`/conversation`).post(handleCreateConversation);
router.route(`/conversation`).get(handleGetConversationMessages);

export default router;
