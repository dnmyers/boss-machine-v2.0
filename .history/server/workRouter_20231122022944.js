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
