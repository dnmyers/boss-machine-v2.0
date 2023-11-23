const express = require("express");
const minionsRouter = express.Router();

const workRouter = require("./workRouter");
minionsRouter.use("/work", workRouter);

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

/************************************\
 *          /api/minions            *
\************************************/

minionsRouter.get("/", (req, res, next) => {
    res.send(getAllFromDatabase("minions"));
});

minionsRouter.post("/", (req, res, next) => {
    let newMinion = addToDatabase("minions", req.body);
    if (newMinion) {
        1;
        res.status(201).send(newMinion);
    } else {
        res.sendStatus(400);
    }
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

minionsRouter.delete("/:minionId", (req, res, next) => {
    let deleted = deleteFromDatabasebyId("minions", req.minion.id);

    if (deleted) {
        res.status(204).send(deleted);
    } else {
        return res.status(500).send("Error deleting minion");
    }
});

/*****************************************\
 *      /api/minions/:minionId/work      *
\*****************************************/
/*
    Schema:

    - Work:
    - id: string
    - title: string
    - description: string
    - hours: number
    - minionId: string

    Routes required:
    - GET /api/minions/:minionId/work to get an array of all work for the specified minon.
    - POST /api/minions/:minionId/work to create a new work object and save it to the database.
    - PUT /api/minions/:minionId/work/:workId to update a single work by id.
    - DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
*/

minionsRouter.get("/:minionId/work", (req, res, next) => {
    let allWork = getAllFromDatabase("work");
    let minionsWork = allWork.filter(
        (work) => work.minionId === req.params.minionId
    );

    if (minionsWork) {
        res.status(200).send(minionsWork);
    } else {
        res.sendStatus(404);
    }
});

module.exports = minionsRouter;
