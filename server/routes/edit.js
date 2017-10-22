var express = require('express');
var router = express.Router();

var pg = require('pg');

var poolModule = require('../modules/pool.js')
var pool = poolModule;


router.put('/:id', function (req, res) {
    var editId = req.params.id;
    var editToDo = req.body;

    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'UPDATE "todos" SET "todo" = $1 "date" = $2 WHERE "id" = $3;';
            db.query(queryText, [editToDo.todo, editToDo.date, editId], function (errorMakingQuery, result) {
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
})


module.exports = router;