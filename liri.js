require("dotenv").config();

var keys = require("./key.js");
var Twitter = require("twitter");
var requestPackage = require("request");
var spotify = require("node-spotify-api");

var spotify = new spotify (keys.spotify);
var client = new Twitter (keys.twitter);

var params = {screen_name: 'Gaccettu1'};

var command = process.argv[2];
var song = process.argv.slice(3);

var commands = function () {
    if (command === "my-tweets"){
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
              for (i = 0; i < 20; i++){
                console.log(tweets[i].created_at); 
                console.log(tweets[i].text);       
              };
            };
          });

    }else if (command === "spotify-this-song"){
        if (song.length === 0){
            song = "All the small things";
            console.log("You didn't pick a song! Try This one out");
            console.log("----------------------");
            spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Track Name: " + data.tracks.items[0].name);
                console.log(data.tracks.items[0].external_urls.spotify);
                console.log("Album: " + data.tracks.items[0].album.name);
             });
        }else{
        spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
           console.log("Artist: " + data.tracks.items[0].artists[0].name);
           console.log("Track Name: " + data.tracks.items[0].name);
           console.log(data.tracks.items[0].external_urls.spotify);
           console.log("Album: " + data.tracks.items[0].album.name);
        })};
    }else if (command === "movie-this"){
        console.log("movie-this")
    }else if (command === "do-what-it-says"){
        console.log("do-what-it-says")
    }else{
        console.log("I don't comprehend")
    };
};
commands();