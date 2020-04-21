//to connect to the info inside the .env file//
require("dotenv").config();

// variable to store the request for the code where the API keys are being exported to//
var keys =require("./keys.js");

//fs variable - file system to be able to tead the .txt file

var fs = require("fs");

//variable for axios - node api query for the movies + bands in town

var axios=require("axios");

//variable for the node spotify api - spotify does not use axios

var spotify=require("node-spotify-api");

//variable that will indicate where to start in the command line in node- slice will make sure 
//that the node path does not show

var node= process.argv[2].slice();

//variables to use the keys in this file - importing the keys into this file

var spotify = new spotify(keys.spotify);
var omdb = new omdb(keys.omdb);
var bandsINtown = new BandsINtown(keys.bandsINtown);


// use switch to call the different functions for the different apis
switch(expression) {
    case "movie-this":
      findMovie();
      break;
    case "concert-this":
      findBands();
      break;
      case "do-what-it-says":
      whatITsays();
      break;
      case "spotify-this-song":
      findSong();
      break;
    default:
      console.log("Try again.")
}

function findMovie(){
var query= "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdb;
console.log(query);

axios.get(query).then(function(res){
    console.log("Release Year:", response.data.Year)
})
.catch(function(err){
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
})
}

//function findMovie- in  this function use axios to call in the specific movie the user is looking for

//function findBands - in this function use axios to call in the bands who are in town.
//need to use moment to display the date

//function findSong -this is the function for spotify

// function whatITsays - this is the function to read what is in the random.txt



