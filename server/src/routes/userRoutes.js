const { register } = require("../controllers/userController");

const router = require("express").Router();
router.get("/", () => {
    console.log("foi");
})
router.post("/register", register);

module.exports = router;
