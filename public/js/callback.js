function error(id, text) {
	$("#" + id + "Error").text(text);
}

function validNumber(num) {
	var intRegex = /^\d+$/;
	return intRegex.test(num) && num.length == 10;
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

function checkNumber(msgOk, then) {
	var num = $("#number").val().trim();

	$.get("/check-number", { num: num })
	.done(function(data) {
		error("number", "");
		$("#spinner").hide();
		if (msgOk && then) {
			then();
		}
	}).fail(function() {
		error("number", "Invalid number");
		$("#spinner").hide();
	});
}

function checkForm(then) {
	var msgOk = checkMessage();
	checkNumber(msgOk, then);
}

function sendMessage() {
	$("#spinner").hide();
	var msg = $("#message").val().trim();
	var num = $("#number").val().trim();

	var logMsg = "Message '" + msg + "' was sent to " + num;
	console.log(logMsg);
	alert(logMsg);

	$("#message").val("");
	$("#number").val("");
}

$(document).ready(function() {
	$("#message").change(checkMessage);

	$("#number").change(checkNumber);

	$("#theForm").submit(function(event) {
		event.preventDefault();
		$("#spinner").show();

		checkForm(sendMessage);
	});
});
