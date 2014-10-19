function error(id, text) {
	$("#" + id + "Error").text(text);
}

function checkMessage(msg) {
	if (!msg) {
		error("message", "Message is empty");
	} else {
		error("message", "");
	}
}

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

function getTrimmedVal(e) {
	console.log("getTrimmedVal: " + e.target.value);
	return e.target.value.trim();
}

$(document).ready(function() {
	var messageVal = Rx.Observable.fromEvent($("#message"), 'change')
	.map(getTrimmedVal);
	messageVal.subscribe(checkMessage);

	var numberVal = Rx.Observable.fromEvent($("#number"), 'change')
	.map(getTrimmedVal);

	var numberOk = numberVal.flatMap(function(num) {
		console.log("flatMap: " + num);
		return Rx.Observable.fromPromise($.get("/check-number", { num: num }))
			.catch(Rx.Observable.returnValue("INVALID"));
	});
	numberOk.subscribe(function(data) {
		if (data == "INVALID") {
			error("number", "Invalid number")
		} else {
			error("number", "");
		}
	});

	/*
	$("#theForm").submit(function(event) {
		event.preventDefault();
		$("#spinner").show();

		checkForm().then(sendMessage);
	});
*/
});
