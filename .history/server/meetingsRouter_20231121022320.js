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
    res.status(201).send(newMeeting);
});

meetingsRouter.get("/:meetingId", (req, res, next) => {
    res.send(req.meeting);
});

meetingsRouter.put("/:meetingId", (req, res, next) => {
    const updatedMeeting = updateInstanceInDatabase("meetings", req.body);
    res.send(updatedMeeting);
});

meetingsRouter.delete("/", (req, res, next) => {
    const deleted = deleteAllFromDatabase("meetings");
    if (deleted) {
        res.sendStatus(204);
    } else {
        res.status(500).send("Error while deleting meetings");
    }
});
