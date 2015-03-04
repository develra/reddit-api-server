//Includes
var express = require('express')
var app = express()
var qs = require('qs');
reddit = require('redwrap');
unirest = require('unirest');

//Reddit/Sentiment Hackathon
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

app.get('/sentiment/:text', function(req, res) {

     
    unirest.post("https://community-sentiment.p.mashape.com/text/")
    .header("X-Mashape-Key", "E6WL92qMwrmshxL8kvYhvpsLCqQrp1vND7GjsnSnNoYtktrdJL")
    .header("Content-Type", "application/x-www-form-urlencoded")
    .header("Accept", "application/json")
    .send({"txt": req.params.text})
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
      res.send(result)
});
});
//Stocks Individual Assignment
app.get('/symbol/:text', function(req, res) {
    unirest.get("http://dev.markitondemand.com/Api/v2/Lookup/json?input=" + 
     req.params.text)
    .end(function (result) {
        res.send(JSON.parse(result.body));
    });
});


app.get('/quote/:symbol', function(req, res) {
    unirest.get("http://dev.markitondemand.com/Api/v2/Quote/json?symbol=" + 
     req.params.symbol)
    .end(function (result) {
        res.send(result.body);
    });
});

// Port Binding
app.set('port', (process.env.PORT || 3000))

var server = app.listen(process.env.PORT || app.get('port'), function() {

    var host = server.address().address
    var port = server.address().port
    console.log('App listening at http://%s:%s', host, port)
})
