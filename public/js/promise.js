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

/**
 * Returns a promise that will be fullfilled with a boolean
 * when the number has been checked.
 */
function checkNumber() {
	var num = $("#number").val().trim();

	var promiseFun = function(fullfill, reject) {
		$.get("/check-number", { num: num })
		.done(function(data) {
			error("number", "");
			return fullfill(true);
		}).fail(function() {
			error("number", "Invalid number");
			return fullfill(false);
		});
	};
	return new Promise(promiseFun);
}

/**
 * Returns a promise that will be fullfilled with a boolean 
 * when the form has been checked.
 */
function checkForm() {
	var msgOk = checkMessage();
	return checkNumber().then(function(okNumber) {
		return msgOk && okNumber;
	});
}

function sendMessage(ok) {
	$("#spinner").hide();
	if (ok) {
		var msg = $("#message").val().trim();
		var num = $("#number").val().trim();

		var logMsg = "Message '" + msg + "' was sent to " + num;
		console.log(logMsg);
		alert(logMsg);

		$("#message").val("");
		$("#number").val("");
	}
}

$(document).ready(function() {
	$("#message").change(checkMessage);

	$("#number").change(checkNumber);

	$("#theForm").submit(function(event) {
		event.preventDefault();
		$("#spinner").show();

		checkForm().then(sendMessage);
	});
});
