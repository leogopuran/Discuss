

var username;
var emptyValueCheckList = ["", "Undefined", "undefined", undefined, null];

// ask username
function readUserData(){
	var username = $('#userName').val();
	var topic = $('#topic').val().toLowerCase();

	if(!emptyValueCheckList.includes(username)){
		if(localStorage){
			localStorage.setItem('userName', username);
			window.location.replace("/chat?topic=" + topic);	
		}
		else{
			alert("Browser not suppoerted...!");
		}
	}
}

$(document).ready(function(){
    if(localStorage){
		if(!emptyValueCheckList.includes(localStorage.getItem('userName'))){
			$('#userName').val(localStorage.getItem('userName'));
			$('#userName').attr("disabled", true);
		}
	}
	else{
		alert("Browser not suppoerted...!");
	}
});