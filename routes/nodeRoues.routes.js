const express = require("express");
const { welcomeMsg, registerUser, userCount, sendMsg, allMsgs } = require("../controllers/apiResponseController");
const apiRoute = express.Router();

apiRoute.get("/welcomeNodeMsg", welcomeMsg)
apiRoute.post("/registerUser", registerUser)
apiRoute.get("/userCount", userCount)
apiRoute.post("/sendMsg", sendMsg)
apiRoute.get("/allMsgs", allMsgs)

module.exports = { apiRoute };