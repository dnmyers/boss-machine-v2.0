// Don't need a GET for individual meetings
// Meetings aren't updated, so no PUT endpoint
// Don't need a meetingId param
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
