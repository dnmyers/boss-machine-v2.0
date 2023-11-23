const express = require("express");
const apiRouter = express.Router();

const minionsRouter = require("./minionsRouter");
apiRouter.use("/minions", minionsRouter);

const ideasRouter = require("./ideasRouter");
apiRouter.use("/ideas", ideasRouter);

module.exports = apiRouter;
