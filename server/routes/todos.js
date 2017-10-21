var express = require('express');
var router = express.Router();

var pg = require('pg');

var poolModule = require('../modules/pool.js')
var pool = poolModule;

router.post('/', function (req, res) {
    var toDo = req.body; // This the data we sent
    console.log(toDo); // Has a name and cost

    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'INSERT INTO "todos" ("todo", "date", "complete") VALUES ($1, $2, $3);';
            db.query(queryText, [toDo.task, toDo.dateDue, toDo.complete], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    // Send back success!
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    }); // END POOL
});