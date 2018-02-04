require("dotenv").config();

var keys = require("./key.js");
var Twitter = require("twitter");
var request = require("request");
var spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new spotify (keys.spotify);
var client = new Twitter (keys.twitter);

var params = {screen_name: 'Gaccettu1'};

var command = process.argv[2];
var commandType = process.argv.slice(3);

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
        if (commandType.length === 0){
            commandType = "All the small things";
            console.log("You didn't pick a song! Try This one out");
            console.log("----------------------");
        };
        spotify.search({ type: 'track', query: commandType, limit: 1 }, function(err, data) {
           console.log("Artist: " + data.tracks.items[0].artists[0].name);
           console.log("Track Name: " + data.tracks.items[0].name);
           console.log(data.tracks.items[0].external_urls.spotify);
           console.log("Album: " + data.tracks.items[0].album.name);
        });
    }else if (command === "movie-this"){
        if (commandType.length === 0){
            commandType = "Mr Nobody";
            console.log("You didn't pick a movie! Try This one out");
            console.log("----------------------");
        };
        request(`http://www.omdbapi.com/?apikey=trilogy&t=${commandType}`, 
        function(error, response, body){
            let data = JSON.parse(body);
            console.log("Title: " + data.Title);
            console.log("Year: " + data.Year);
            console.log("IMDB Rating: " + data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            }
    );
    }else if (command === "do-what-it-says"){
        fs.readFile("random.txt", "utf8", function(error, choice) {
              if (error) {
                return console.log(error);
              };
              var dataArr = choice.split(",");
              var commandNumber = Math.floor(Math.random() * 3);
              command = dataArr[commandNumber];
              if (commandNumber === 1){commandType = dataArr[3];}
              else if (commandNumber === 2){commandType = dataArr[4]}
              else if(commandNumber === 0){commandType = ""};
              commands();
            
            });
    }else{
        console.log("I don't comprehend")
    };
};
commands();