const { register, login } = require("../controllers/userController");

const router = require("express").Router();
router.get("/", () => {
    console.log("foi");
})
router.post("/register", register);
router.post("/login", login);

module.exports = router;
