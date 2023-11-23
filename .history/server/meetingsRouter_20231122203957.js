const express = require("express");
const meetingsRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
} = require("./db");

/*
    Schema:
    - Meeting
        - time: string
        - date: JS `Date` object
        - day: string
        - note: string

    - `/api/meetings`
    - GET /api/meetings to get an array of all meetings.
    - POST /api/meetings to create a new meeting and save it to the database.
    - DELETE /api/meetings to delete _all_ meetings from the database.
*/

meetingsRouter.get("/", (req, res, next) => {
    res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res, next) => {
    const newMeeting = addToDatabase("meetings", createMeeting());
    if (newMeeting) {
        res.status(201).send(newMeeting);
    } else {
        return res.status(500).send("Error creating meeting");
    }
});

// Delete ALL meetings from the database
meetingsRouter.delete("/", (req, res, next) => {
    const deleted = deleteAllFromDatabase("meetings");
    if (deleted) {
        res.sendStatus(204);
    } else {
        res.status(500).send("Error while deleting meetings");
    }
});

module.exports = meetingsRouter;
