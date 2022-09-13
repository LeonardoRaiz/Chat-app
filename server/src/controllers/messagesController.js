const messageModel = require("../model/messageModel");

module.exports.addMsg = async (req, res, next) => {
  try {
    const data = await messageModel.insertMsg(req.body);
    if (data) {
      return res.json({ message: "Mensagem add com sucesso" });
    } else {
      return res.json({ message: "Falha ao add a msg" });
    }
  } catch (e) {
    next(e);
  }
};
module.exports.getAllMsg = async (req, res, next) => {
  try {
    const { from } = req.body;
    const data = await messageModel.allMessages(req.body);
    console.log(data);
    const projectMessages = data.map((msg) => {
      return {
        msg: msg.msg,
        fromSelf: msg.from.toString() === from,
      };
    });

    res.json(projectMessages);
  } catch (e) {
    next(e);
  }
};
