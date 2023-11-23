const express = require("express");
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");

minionsRouter.param("minionId", (req, res, next, id) => {
    const minion = getFromDatabaseById("minions", id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get("/", (req, res, next) => {
    res.send(getAllFromDatabase("minions"));
});

minionsRouter.get("/:minionId", (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
    let updatedMinion = { ...req.minion, ...req.body };
    let updatedMinionInstance = updateInstanceInDatabase(
        "minions",
        updatedMinion
    );
    if (updatedMinionInstance) {
        res.send(updatedMinionInstance);
    } else {
        res.status(404).send();
    }
});

module.exports = minionsRouter;
