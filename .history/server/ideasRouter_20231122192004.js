const express = require("express");
const ideasRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");

const checkMillionDollarIdea = require("./checkMillionDollarIdea");

ideasRouter.param("ideaId", (req, res, next, id) => {
    const idea = getFromDatabaseById("ideas", id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        return res.status(404).send();
    }
});

ideasRouter.get("/", (req, res, next) => {
    res.send(getAllFromDatabase("ideas"));
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase("ideas", req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
    let updatedIdea = { ...req.idea, ...req.body };
    let updatedIdeaInfo = updateInstanceInDatabase("ideas", updatedIdea);
    res.send(updatedIdeaInfo);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
    const deleted = deleteFromDatabasebyId("ideas", req.idea.id);
    if (deleted) {
        res.sendStatus(204);
    } else {
        res.status(500).send("Error while deleting idea");
    }
});

module.exports = ideasRouter;
