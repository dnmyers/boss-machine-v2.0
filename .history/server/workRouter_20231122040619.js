const express = require("express");
const workRouter = express.Router({ mergeParams: true });

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");

workRouter.param("workId", (req, res, next, id) => {
    const work = getFromDatabaseById("work", id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send("Work not found");
    }
});

workRouter.get("/", (req, res, next) => {
    const work = getAllFromDatabase("work").filter(
        (singleWork) => singleWork.minionId === req.params.minionId
    );
    res.status(200).send(work);
});

workRouter.post("/", (req, res, next) => {
    const newWork = req.body;
    newWork.minionId = req.params.minionId;
    const createdWork = addToDatabase("work", newWork);
    res.status(201).send(createdWork);
});

workRouter.get("/:workId", (req, res, next) => {
    res.send(req.work);
});

workRouter.put("/:workId", (req, res, next) => {
    const updatedWork = { ...req.work, ...req.body };
    const updatedWorkInstance = updateInstanceInDatabase("work", updatedWork);

    if (updatedWorkInstance) {
        res.send(updatedWorkInstance);
    } else {
        res.sendStatus(500);
    }
});

workRouter.delete("/:workId", (req, res, next) => {
    const deleted = deleteFromDatabasebyId("work", req.work.id);
    if (deleted) {
        res.sendStatus(204);
    } else {
        return res.status(500).send("Error while deleting work");
    }
});

module.exports = workRouter;
