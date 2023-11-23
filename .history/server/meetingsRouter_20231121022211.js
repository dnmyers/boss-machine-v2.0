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
