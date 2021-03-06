
var socket;
var emptyValueCheckList = ["", "Undefined", "undefined", undefined, null];

var username;
username = localStorage.getItem('userName');
console.log(username + " retrived from localStorage");

if(!emptyValueCheckList.includes(username)){
	socket = io.connect('http://34.207.71.75:8080/');
	socket.emit('username', username);
}
else {
	alert("connectivity failed..!");
}


// submit text message without reload/refresh the page
var topic;
let urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('topic')){
    topic = urlParams.get('topic')
}

var uploader = new SocketIOFileUpload(socket);
uploader.listenOnInput(document.getElementById("siofu_input"));

socket.on('upload.progress', function(uploadProgress) {
    if(uploadProgress.percentage == 100){
        socket.emit(topic, uploadProgress, topic);
    }
});

$('#chatForm').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    console.log("topic on formsubmit -> " + topic);
    if(!emptyValueCheckList.includes(username)){
    	socket.emit(topic, $('#txt').val(), topic);
    	$('#txt').val("");
	}
    return false;
});

// append the chat text message
socket.on(topic, function(msg) {
    console.log("client topic = " + topic);
	if(!emptyValueCheckList.includes(username)){
    	$('#messages').append($('<li class="row">').html(msg));
    	scrollToLastMessage();
	}
});

// append text if someone is online
socket.on('is_online_'+ topic, function(username) {
    $('#messages').append($('<li class="userStatus">').html(username));
    scrollToLastMessage();
});


function scrollToLastMessage() {
  var elem = document.getElementById('msgs');
  elem.scrollTop = elem.scrollHeight;
}

function isTyping(){
	// alert("User is Typing");
}

function setTopicName(){
    $('#topicName').text(topic);
}

function disconnect(){
    localStorage.removeItem('userName')
    window.location.href('/');
} 

function uploadImg(imageElement){
    return imageElement;
}

$(document).ready(function(){
    setTopicName();
});
