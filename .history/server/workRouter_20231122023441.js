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

//* Schema:
// {
//      id: 'A String that uniquely identifies each work',
//      title: "A String that is the title of the work",
//      description: "A String that is the description of the work",
//      hours: A Number that is the number of hours worked on the work,
//      minionId: 'A String that is the id of the minion that the work belongs to',
// }

workRouter.get("/", (req, res, next) => {
    const work = getAllFromDatabase("work").filter(
        (singleWork) => singleWork.minionId === req.params.minionId
    );
    res.send(work);
});

workRouter.post("/", (req, res, next) => {
    const newWork = req.body;
    newWork.minionId = req.params.minionId;
    const createdWork = addToDatabase("work", newWork);
    res.status(201).send(createdWork);
});
