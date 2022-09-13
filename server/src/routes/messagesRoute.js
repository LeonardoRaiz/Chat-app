const { addMsg, getAllMsg } = require("../controllers/messagesController");

const router = require("express").Router();
router.get("/", () => {
    console.log("foi");
})
router.post("/addmsg", addMsg);
router.post("/getmsg", getAllMsg);


module.exports = router;