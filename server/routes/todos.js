var express = require('express');
var router = express.Router();

var pg = require('pg');

var poolModule = require('../modules/pool.js')
var pool = poolModule;

//post for initial to do submit
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
            var queryText = 'INSERT INTO "todos" ("todo", "date") VALUES ($1, $2);';
            console.log('queryText', queryText, [toDo.task, toDo.dateDue]);
            
            db.query(queryText, [toDo.task, toDo.dateDue], function (errorMakingQuery, result) {
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

//get for todos not completed
router.get('/', function(req, res){
    pool.connect(function(errorConnectingToDb, db, done){ //pool connection
        if(errorConnectingToDb) {
            console.log('error connecting to db', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT * FROM "todos" WHERE "complete" is null ORDER BY "date" ASC;';
            db.query(queryText, function(errorMakingQuery, result){
                done();
                if(errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    })//pool connection
})

router.put('/completetodo/:id', function(req, res){
    var completeToDoId = req.params.id;

    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'UPDATE "todos" SET "complete" = $1 WHERE "id" = $2;';
            db.query(queryText, ["NOW", completeToDoId], function (errorMakingQuery, result) {
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