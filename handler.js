function validNumber(num) {
	if (!num) {
		return false;
	}
	num = num.trim();
	var intRegex = /^\d+$/;
	return intRegex.test(num) && num.length == 10;
}

exports.checkNumber = function(req, res) {
    res.set("Content-Type", "application/json");
	var num = req.param('num');

	// artificial delay
	setTimeout(function() {
		if (validNumber(num)) {
		  res.status(204);
		} else {
		  res.status(500);
		  res.send({ error: "Invalid number" });
		}
		res.end();
	}, 1500);
};