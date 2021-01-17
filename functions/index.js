const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.get("*", function (req, res) {
	res.redirect(`https://fll-scorer.web.app/` + req.path);
});

exports.app = functions.https.onRequest(app);
