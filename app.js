var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs")

app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("search")
})

app.get("/results", function(req, res){
  var state = req.query.state;
  var city = req.query.city;
  var url = "http://api.brewerydb.com/v2/locations?locality="+city+"&region="+state+"&key=5af387c479e918469e46c7ac95924ec8"
  request(url, function(error, response, body){
      if(!error && response.statusCode == 200) {
          var data = JSON.parse(body)
          res.render("results", {data: data})
          console.log(response.statusCode)
      } else if (error) {
        console.log(error)
      }
  });
});

app.get("/allresults", function(req, res){
  var state = req.query.state;
  var city = req.query.city;
  var url = "http://api.brewerydb.com/v2/locations?locality="+city+"&region="+state+"&key=5af387c479e918469e46c7ac95924ec8"
  request(url, function(error, response, body){
      if(!error && response.statusCode == 200) {
          var data = JSON.parse(body)
          res.render("allresults", {data: data})
          console.log(response.statusCode)
      } else if (error) {
        console.log(error)
      }
  });
});

app.listen(3000, function(){
  console.log("Server Online")
})