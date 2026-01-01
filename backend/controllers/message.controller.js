const Message = require("../models/message.model");
const Conversation = require("../models/conversation.models");
const { getIO } = require("../config/socket");
const getReceiverId = require("../utils/getReceiverId");

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const senderId = req.user.id;

    if (!conversationId || conversationId === 'undefined' || !text) {
      return res.status(400).json({ message: "Valid conversation ID and text are required" });
    }

    const convo = await Conversation.findById(conversationId);
    if (!convo || !convo.participants.includes(senderId)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const message = new Message({
      conversationId,
      senderId,
      text
    });
    await message.save();

    await message.populate('senderId', 'name email avatarUrl');

    const receiverId = getReceiverId(convo.participants, senderId);
    const io = getIO();

    io.to(receiverId.toString()).emit("newMessage", message);

    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    if (!conversationId || conversationId === 'undefined') {
      return res.status(400).json({ message: "Valid conversation ID is required" });
    }

    const convo = await Conversation.findById(conversationId);
    if (!convo || !convo.participants.includes(userId)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const messages = await Message.find({ conversationId })
      .populate('senderId', 'name email avatarUrl')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
