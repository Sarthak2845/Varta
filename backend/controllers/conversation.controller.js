const Conversation = require("../models/conversation.models");
const Message = require("../models/message.model");

exports.getOrCreateConversation = async (req, res) => {
  try {
    const senderId = req.user.id;

    if (!req.body || !req.body.receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    const { receiverId } = req.body;

    let convo = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate('participants', 'name email avatarUrl');

    if (!convo) {
      convo = await Conversation.create({
        participants: [senderId, receiverId]
      });
      await convo.populate('participants', 'name email avatarUrl');
    }
    res.status(200).json({
      convo,
      message: "Conversation ready"
    });

  } catch (error) {
    console.error("Error in getOrCreateConversation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.find({
      participants: userId
    })
      .populate('participants', 'name email avatarUrl')
      .sort({ createdAt: -1 });

    // Get last message for each conversation
    const conversationsWithLastMessage = await Promise.all(
      conversations.map(async (convo) => {
        const lastMessage = await Message.findOne({
          conversationId: convo._id
        })
          .populate('senderId', 'name')
          .sort({ createdAt: -1 });

        return {
          ...convo.toObject(),
          lastMessage
        };
      })
    );

    res.json(conversationsWithLastMessage);
  } catch (error) {
    console.error("Error getting user conversations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
