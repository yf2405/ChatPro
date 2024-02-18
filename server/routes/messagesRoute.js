const { addMessage, getAllMessage, getAllMessageGroup } = require('../controllers/messagesController');

const router = require('express').Router();

router.post("/addmsg/",addMessage);
router.post("/getmsg/",  getAllMessage);
router.post("/getmsggroup/",  getAllMessageGroup);


module.exports = router;