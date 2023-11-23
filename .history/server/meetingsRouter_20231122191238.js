// Meetings aren't updated, so no put endpoint
const express = require("express");
const meetingsRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
} = require("./db");

meetingsRouter.use("/:meetingId", (req, res, next, id) => {
    const meeting = getFromDatabaseById("meetings", id);
    if (meeting) {
        req.meeting = meeting;
        next();
    } else {
        return res.sendStatus(404);
    }
});

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

meetingsRouter.get("/:meetingId", (req, res, next) => {
    res.send(req.meeting);
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
