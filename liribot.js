//to connect to the info inside the .env file//
require("dotenv").config();

// variable to store the request for the code where the API keys are being exported to//
var keys =require("./keys.js");

//fs variable - file system to be able to tead the .txt file

var fs = require("fs");

// var to het moment
var moment=require("moment");

//variable for axios - node api query for the movies + bands in town

var axios=require("axios");

//variable for the node spotify api - spotify does not use axios

var spotify=require("node-spotify-api");

//variable that will indicate where to start in the command line in node- slice will make sure 
//that the node path does not show

var cmmnode= process.argv[2];
var search=process.argv.slice(3).join(" ");


//variables to use the keys in this file - importing the keys into this file

var spotify = new spotify(keys.spotify);
// var omdb = new omdb(keys.omdb);
// var bandsINtown = new BandsINtown(keys.bandsINtown);

function searchThis(){
// use switch to call the different functions for the different apis
switch(cmmnode) {
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
};
//function findMovie- in  this function use axios to call in the specific movie the user is looking for
function findMovie(){
  
 
var query= "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
console.log(query);

axios.get(query).then(function(res){
  console.log("********************MOVIE RESULT***************************")
    console.log("Movie Title:", res.data.Title);
    console.log("Year Released:", res.data.Year);
    console.log("Plot", res.data.Plot);
    console.log("Actors:", res.data.Actors);
    console.log("IMDB Rating:", res.data.imdbRating);
    console.log("Rotten Tomatoes Rating:", res.data.Ratings[1].Value);
    console.log ("Language:", res.data.Language);
    console.log("Producion Country:", res.data.Country);
    console.log("***********************************************************")

})
.catch(function(err){
    if (err.res) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(err.res.data);
        console.log("---------------Status---------------");
        console.log(err.res.status);
        console.log("---------------Status---------------");
        console.log(err.res.headers);
      } else if (err.req) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(err.req);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", err.message);
      }
      console.log(err.config);
});
};



//function findBands - in this function use axios to call in the bands who are in town.
//need to use moment to display the date
function findBands(){
    var query= "https://rest.bandsintown.com/artists"+ search+ "/events?app_id=codingbootcamp"

    axios.get(query).then(function(res){
       console.log("*************** Bands in Town **************************");
       console.log("Artist:", search);
       console.log("Venue:",res.data[0].venue.name);
       console.log("Location:", res.data[0].venue.city);
       console.log("Date:",moment(res.data[0].datatime).format("MM-DD-YYYY h:mm a"));
      })
      .catch(function(err){
        if(err) throw err
      });
    
};
//function findSong -this is the function for spotify
function findSong(){
  spotify.search({type:"track", query:search}, function(err,data){
    if(err){
      return console.log("There was Error:", err)
    };
    console.log("**********************Your Song*******************")
    console.log("Artist(s) Name:", data.tracks.items[0].album.artist[0].name);
    console.log("Song Name:", data.tracks.items[0].name);
    console.log("Song Preview Link", data.tracks.items[0].href);
    console.log("Album", data.tracks.item[0].album.name);
    console.log("*****************************************************")
  });
};

// function whatITsays - this is the function to read what is in the random.txt
function whatITsays(){
  fs.readFile("random.txt", "utf8", function(err, data){
    if(err){
      return console.log(err);
    }else{
      console.log(data);

      var randomData = data.split(",");
      cmmnode=randomData[0];
      search =randomData[1];
    }
  });
};



searchThis();