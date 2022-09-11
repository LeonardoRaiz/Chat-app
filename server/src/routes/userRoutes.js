const { register, login, setAvatar, getAllusers } = require("../controllers/userController");

const router = require("express").Router();
router.get("/", () => {
    console.log("foi");
})
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:username", setAvatar);
router.get('/allUsers/:username', getAllusers)

module.exports = router;
