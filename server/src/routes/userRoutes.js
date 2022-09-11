const { register, login, setAvatar } = require("../controllers/userController");

const router = require("express").Router();
router.get("/", () => {
    console.log("foi");
})
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:username", setAvatar);

module.exports = router;
