function error(id, text) {
	$("#" + id + "Error").text(text);
}

function checkMessage() {
	var msg = $("#message").val().trim();
	if (!msg) {
		error("message", "Message is empty");
		return false;
	} else {
		error("message", "");
		return true;
	}
}

function checkNumber() {
	var num = $("#number").val().trim();
	$.get("/check-number", { num: num })
	.done(function(data) {
		error("number", "");
		$("#spinner").hide();
		return true;
	}).fail(function() {
		error("number", "Invalid number");
		$("#spinner").hide();
		return false;
	});
}

function checkForm() {
	var numOk = checkNumber();
	var msgOk = checkMessage();
	return numOk && msgOk;
}

function sendMessage() {
	var msg = $("#message").val().trim();
	var num = $("#number").val().trim();

	var logMsg = "Message '" + msg + "' was sent to " + num;
	alert(logMsg);
	console.log(logMsg);

	$("#message").val("");
	$("#number").val("");
}

$(document).ready(function() {
	$("#message").change(checkMessage);

	$("#number").change(checkNumber);

	$("#theForm").submit(function(event) {
		event.preventDefault();
		$("#spinner").show();

		var formOk = checkForm();

		if (formOk) {
			sendMessage();
		}
	});
});
