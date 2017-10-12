var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb');
var app = express();
var bodyParser = require('body-parser');
var ansokning = require('./ansokning');

app.use(bodyParser.json());
app.use('/ansokning', ansokning);



MongoClient.connect('mongodb://ECGrupp3:Frontend2016@cluster0-shard-00-00-dmlri.mongodb.net:27017,cluster0-shard-00-01-dmlri.mongodb.net:27017,cluster0-shard-00-02-dmlri.mongodb.net:27017/fordondb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', function(err, db){
    if (err) throw err
  
    
    db.collection('fordon').find().toArray(function (err, result){
        if (err) throw err
        
        console.log('Connected to database');
        
        var fordoncollection = db.collection('fordon');

/* GET home page.*/ 
router.get('/', function(req, res, next) {
    fordoncollection.find({}).toArray(function(err, fordonResult) {
            if (err) {
                res.send(err);
            } else if (fordonResult.length) {
                res.render('nybokning', {
                    'fordonlist': fordonResult,
                });
            } else {
                res.send('No documents found');
            }
            //db.close();
    })})})
  //res.render('index', { title: 'Express' });
});




module.exports = router;
