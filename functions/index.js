const functions = require("firebase-functions");
const express = require("express");
var favicon = require("serve-favicon");
const path = require("path");

const app = express();

app.set("views", "./views");

app.set("view engine", "ejs");

app.use(favicon(path.join(__dirname, "/", "favicon.ico")));

app.use("/static", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
	//cached for a month
	res.setHeader("Cache-Control", "public, max-age=2592000");
	res.render("index");
});

app
	.get("/sitemap.xml", function (req, res) {
		// send XML map
		res.sendFile(__dirname + "/sitemap.xml");
	})
	.get("/robots.txt", function (req, res) {
		// send TXT map
		res.sendFile(__dirname + "/robots.txt");
	});

app.use(function (req, res, next) {
	res
		.status(404)
		.send("Error 404. The URL you are trying to go to doesn't exist.");
});

exports.app = functions.https.onRequest(app);
