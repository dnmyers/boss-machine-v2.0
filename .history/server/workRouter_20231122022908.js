const express = require('express');
const workRouter = express.Router({ mergeParams: true });

const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

)