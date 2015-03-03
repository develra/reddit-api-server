var express = require('express')
var app = express()
var qs = require('qs');
reddit = require('redwrap');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
    res.send("Develra's Reddit O-Auth Avoidence Service")
})

app.get('/user/:username', function(req, res) {    
    
    reddit.user(req.params.username, function(error, data) {
      res.send(data);
    });
});

app.get('/r/:subreddit', function(req, res) {
    reddit.r(req.params.subreddit, function(error, data) {
        res.send(data);
    });
});

app.get('/list/:list', function(req, res) {
    reddit.list(req.params.list, function(err, data) {
        res.send(data);
    });
});

app.set('port', (process.env.PORT || 3000))

var server = app.listen(process.env.PORT || app.get('port'), function() {

    var host = server.address().address
    var port = server.address().port
    console.log('App listening at http://%s:%s', host, port)
})
