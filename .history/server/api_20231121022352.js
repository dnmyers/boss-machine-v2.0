const express = require("express");
const apiRouter = express.Router();

const minionsRouter = require("./minionsRouter");
apiRouter.use("/minions", minionsRouter);

const ideasRouter = require("./ideasRouter");
apiRouter.use("/ideas", ideasRouter);

const meetingsRouter = require("./meetingsRouter");
apiRouter.use("/meetings", meetingsRouter);

module.exports = apiRouter;
