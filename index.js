const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
	pingInterval: 60000,
  	pingTimeout: 60000
});
var path = require('path')

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join(__dirname + "/node_modules/bootstrap")));
app.use(express.static(path.join(__dirname + "/node_modules/jquery")));
app.use(express.static(path.join(__dirname + "/node_modules/font-awesome")));

app.get('/', function(req, res) {
    res.render('login.html');
});

var topic;
app.get('/chat', function(req, res) {
    topic = req.query.topic; 
    console.log("topic from url : " + topic);
    res.render('chat.html');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
    	if(emptyUsernameCheck(username)){
        	socket.username = username;
        	io.emit('is_online_'+ topic, '🔵 <i>' + socket.username + ' joined the chat..</i>');
        }
    });

    socket.on('disconnect', function(disconnectError) {
    	if(emptyUsernameCheck(socket.username)){
    		console.log(socket.username + " Disconnected because of " + disconnectError);
        	io.emit('is_online_'+ topic, '🔴 <i>' + socket.username + ' left the chat..</i><label class = "timeStamp">'+ generateTimeStamp() +'</label>');
        }
    });

    socket.on(topic, function(message, topicName) {
        console.log("message : " + message);
        console.log("topic : " + topicName);
    	if(emptyUsernameCheck(socket.username)){
        	io.emit(topicName, '<div class="nameBadge col-0" style="background-color:' + generateColorCode(socket.username) + ';">' + generateNameBadge(socket.username) + '</div><p class="col-10">' + message + ' - <label class = "timeStamp">'+ generateTimeStamp() +'</label></p>');
        }
    });

});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});

function generateTimeStamp(){
	var today = new Date();
	var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	return dateTime;
}

function emptyUsernameCheck(username){
	var emptyValueCheckList = ["", "Undefined", "undefined", undefined, null];
	return !emptyValueCheckList.includes(username);
}

function generateNameBadge(userName) {
    var elementText = userName;
    var initialLetters = elementText.match(false ? /\b(\w)/g : /^\w|\b\w(?=\S+$)/g);
    var initials = initialLetters.join('');
    if(initials.length < 2){
        initials = userName.slice(0, 2);
    }
    return initials;
}   

function generateColorCode(str) {
    var colorCode = "#";
    colorCode = colorCode + str.replace(/./g, function(c) {
                        return ('#' + c.charCodeAt(0)).slice(-3);
                    });
    colorCode = colorCode.slice(0, 7);
    return colorCode;
}

