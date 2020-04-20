//to connect to the info inside the .env file//
require("dotenv").config();

// variable to store the request for the code where the API keys are being exported to//
var keys =require("./keys.js");

//variables to use the keys in this file

var spotify = new spotify(keys.spotify);
var omdb = new omdb(keys.omdb);
var bandsINtown = new BandsINtown(keys.bandsINtown);

