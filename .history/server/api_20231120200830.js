const express = require("express");
const apiRouter = express.Router();

const minionsRouter = require("./minionsRouter");
api.use("/minions", minionsRouter);

module.exports = apiRouter;
