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
    if (newIdea) {
        res.status(201).send(newIdea);
    } else {
        return res.status(400).send("Error while creating new idea");
    }
});

ideasRouter.get("/:ideaId", (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = { ...req.idea, ...req.body };

    const updatedIdeaInstance = updateInstanceInDatabase("ideas", updatedIdea);

    if (updatedIdeaInstance) {
        res.send(updatedIdeaInstance);
    } else {
        return res.status(400).send("Error while updating idea");
    }
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
    const deleted = deleteFromDatabasebyId("ideas", req.idea.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(500).send("Error while deleting idea");
    }
});

module.exports = ideasRouter;
