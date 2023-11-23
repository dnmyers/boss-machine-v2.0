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

/*
    Schema:
    - Idea
        - id: string
        - name: string
        - description: string
        - numWeeks: number
        - weeklyRevenue: number

    - `/api/ideas`
    - GET /api/ideas to get an array of all ideas.
    - POST /api/ideas to create a new idea and save it to the database.
    - GET /api/ideas/:ideaId to get a single idea by id.
    - PUT /api/ideas/:ideaId to update a single idea by id.
    - DELETE /api/ideas/:ideaId to delete a single idea by id.
*/

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
    // let updatedIdeaInfo = updateInstanceInDatabase("ideas", req.body);
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
