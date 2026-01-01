const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  sendMessage,
  getMessages
} = require("../controllers/message.controller");
const {
  getOrCreateConversation,
  getUserConversations
} = require("../controllers/conversation.controller");

router.post("/conversation", auth, getOrCreateConversation);
router.get("/conversations", auth, getUserConversations);

router.post("/message", auth, sendMessage);
router.get("/messages/:conversationId", auth, getMessages);

module.exports = router;
