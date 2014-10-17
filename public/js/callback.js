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

function checkNumber() {
	var num = $("#number").val().trim();
	$.get("/check-number", { num: num })
	.done(function(data) {
		error("number", "");
		return true;
	}).fail(function() {
		error("number", "Invalid number");
		return false;
	});
}

function checkForm() {
	var numOk = checkNumber();
	var msgOk = checkMessage();
	return numOk && msgOk;
}

$(document).ready(function() {
	$("#message").change(function(e) {
		checkMessage();
	});

	$("#number").change(function(e) {
		checkNumber();
	});

	$("#theForm").submit(function(event) {
		event.preventDefault();

		var formOk = checkForm();
		var msg = $("#message").val().trim();
		var num = $("#number").val().trim();

		if (formOk) {
			alert("Message '" + msg + "' was sent to " + num);
			$("#message").val("");
			$("#number").val("");
		}
	});
});
