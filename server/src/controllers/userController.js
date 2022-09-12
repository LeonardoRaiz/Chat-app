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
      ""
    );

    return res.json({ msg: "Usuário cadastrado com sucesso", status: true });
  } catch (e) {
    next(e);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    let userNameCheck = await User.findUser(req?.body);
    if (!userNameCheck) {
      console.log("Usuário não cadastrado");
      return res.json({ msg: "Usuário não cadastrado", status: false });
    }
    const { password, username } = req.body;
    let passwordCheck = await User.findPassword(req?.body);
    const isPasswordValid = await bcrypt.compare(password, passwordCheck);
    if (!isPasswordValid) {
      console.log("Senha incorreta");
      return res.json({ msg: "Senha incorreta", status: false });
    }
    
    const isAvatarValid = await User.findAvatar(req?.body);

    let imageSet = true
    if (!isAvatarValid) {
      imageSet = false;
    }

    const  id  = await User.findUserID(req?.body);
    return res.json({
      isAvatarImageSet: imageSet,
      status: true,
      user: username,
      image: isAvatarValid,
      id: id,
    });
  } catch (e) {
    next(e);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const user = req.params.username;
    const avatarImage = req.body.image;
    const upAvatar = await User.updateAvatar(user, avatarImage);
    if(upAvatar)
    {
      return res.json({ isSet: true, image: avatarImage })
    } else {
      return res.json({ isSet: false })
    }
    
  } catch (e) {
    next(e);
  }
};


module.exports.getAllusers = async (req, res, next) => {
  try {
    const users = await User.allUser(req?.params.username)
    return res.json(users)
  } catch (e) {
    next(e);
  }
};