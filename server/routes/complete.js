var express = require('express');
var router = express.Router();

var pg = require('pg');

var poolModule = require('../modules/pool.js')
var pool = poolModule;

//returns completed to dos for page loads
router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDb, db, done) { //pool connection
        if (errorConnectingToDb) {
            console.log('error connecting to db', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT * FROM "todos" WHERE "complete" is not null ORDER BY "complete" ASC;';
            db.query(queryText, function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    })//pool connection
})


router.put('/completetodo/:id', function (req, res) {
    var completeToDoId = req.params.id;

    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'UPDATE "todos" SET "complete" = NULL WHERE "id" = $1;';
            db.query(queryText, [completeToDoId], function (errorMakingQuery, result) {
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