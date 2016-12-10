$(document).ready(function() {

	var tweetControls = $("#tweet-controls");
	var tweetTextArea = $(".tweet-compose");
	var charCount = $("#char-count");
	var tweetButton = $("#tweet-submit");
	var newTweetArea = $("#stream");
	var tweetArea = $(".tweet");
	var tweetActions = $(".tweet-actions");
	var stats = $(".stats");
	var reply = $(".reply");

	tweetControls.css("display", "none");
	tweetActions.css("display", "none");
	stats.css("display", "none");
	reply.css("display", "none");

	tweetTextArea.on("click", function() {
		tweetTextArea.css("height", "5em");
		tweetControls.css("display", "block");
	});

	tweetTextArea.keyup(function() {
		var tweet = tweetTextArea["0"].value;
		var tweetCharCount = tweet.length;
		var curCount = 140 - tweetCharCount;
		charCount["0"].innerText = curCount;
		if (curCount <= 10) {
			charCount.css("color", "red");
		}
		if (curCount < 0) {
			tweetControls.css("display", "none");
		}
		if (curCount >= 0) {
			tweetControls.css("display", "block");
		}
	});

	tweetButton.on("click", function() {
		var tweet = tweetTextArea["0"].value;
		tweetTextArea["0"].value = "";
		charCount["0"].innerText = 140;
		var html = $("#cloneTweet").clone();
		newTweetArea.prepend(addTweet(html, tweet));
		tweetArea = $(".tweet");
	});

	tweetArea.mouseenter(function() {
		var theseActions = $(this).find(".tweet-actions");
		theseActions.css("display", "block");
	}).mouseleave(function() {
		var theseActions = $(this).find(".tweet-actions");
		theseActions.css("display", "none");
	});

	var isActive = false;
	tweetArea.on("click", function() {
		var thisStats = $(this).find(".stats");
		var thisReply = $(this).find(".reply");
		if (!isActive) {
			thisStats.css("display", "block");
			thisReply.css("display", "block");
			isActive = true;
		} else {
			thisStats.css("display", "none");
			thisReply.css("display", "none");
			isActive = false;
		}
	})

});

function addTweet(html, tweet) {

	var time = new Date();

	var months = [
		"Jan", "Feb", "Mar",
		"Apr", "May", "Jun",
		"Jul", "Aug", "Sep",
		"Oct", "Nov", "Dec"
	]

	var hour = time.getHours();
	var min = time.getMinutes();
	var amORpm = "AM";

	if (hour > 12) { hour = hour - 12; amORpm = "PM"; }

	var day = time.getDate();
	var month = months[time.getMonth()];
	var year = time.getFullYear().toString();

	year = year[2] + year[3];

	var timestamp = hour + ":" + min + " " + amORpm + " - " + day + " " + month + " " + year;

	html.find(".avatar").attr("src", "img/alagoon.jpg");
	html.find(".fullname").text("Will.i.am");
	html.find(".username").text("@willIAm")
	html.find(".tweet-text").text(tweet);
	html.find(".num-retweets").text("0");
	html.find(".num-favorites").text("0");
	html.find(".users-interact").html("");
	html.find(".time").text(timestamp);
	html.find(".tweet-compose").attr("placeholder", "Reply to @willIAm");

	return html;
}