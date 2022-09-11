const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    let userNameCheck = await User.findUser(req?.body);
    if (userNameCheck) {
      console.log("Usuário ja está em uso");
      return res.json({ msg: "Usuário ja está em uso", status: false });
    }

    let emailCheck = await User.findEmail(req?.body);
    if (emailCheck) {
      console.log("E-mail já está em uso ja está em uso");
      return res.json({ msg: "E-mail ja está em uso", status: false });
    }
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.insertUser(
      username,
      email,
      hashedPassword,
      false,
      "asdas"
    );

    return res.json({ msg: "Usuário cadastrado com sucesso", status: true });
  } catch (e){
    next(e)
  }
};

module.exports.login = async (req, res, next) => {
  try {
    let userNameCheck = await User.findUser(req?.body);
    if (!userNameCheck) {
      console.log("Usuário não cadastrado");
      return res.json({ msg: "Usuário não cadastrado", status: false });
    }
    const { password } = req.body;
    let passwordCheck = await User.findPassword(req?.body);
    console.log("testeee", passwordCheck);
    const isPasswordValid = await bcrypt.compare(password, passwordCheck)
    if(!isPasswordValid){
      console.log("Senha incorreta");
      return res.json({ msg: "Senha incorreta", status: false });
    }

    return res.json({ msg: "Usuário cadastrado com sucesso", status: true });
  } catch (e){
    next(e)
  }
};