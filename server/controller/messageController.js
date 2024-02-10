const messageMode = require("../models/messageMode");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageMode.create({
      message: { text: message },
      sender: from,
      users: [from, to],
    });
    if (data) return res.json({ msg: "Message added to DB successfully" });
    return res.json({ msg: "Failed to add message to DB successfully" });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageMode
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    const projectedMessage = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessage);
  } catch (ex) {
    next(ex);
  }
};
