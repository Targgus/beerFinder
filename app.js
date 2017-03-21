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
          if(data["totalResults"]>0) {
          res.render("results", {data: data})
      } else {
        res.render("errorPage")
      };
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
            if(data["totalResults"]>0) {
            res.render("allresults", {data: data})
          } else {
            res.render("errorPage")
          };
      }
    })
  });

app.listen(5000, function(){
  console.log("Server Online")
})