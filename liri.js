require("dotenv").config();

var keys = require("keys.js");

var spotify = new spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

function commands () {
    if (command === "my-tweets"){
        console.log("my tweets")
    }else if (command === "spotify-this-song"){
        console.log("spotify-this-song")
    }else if (command === "movie-this"){
        console.log("movie-this")
    }else if (command === "do-what-it-says"){
        console.log("do-what-it-says")
    }else{
        console.log("I don't comprehend")
    };
};