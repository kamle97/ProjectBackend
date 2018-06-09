var express = require('express');
var router = express.Router();
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
    console.log("connected");
});

users = [];
connections = [];

console.log("index js wczytany");

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
    var user = req.user;
    res.render('index');
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;

io.on('connection', function (socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    //disconnect
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
});