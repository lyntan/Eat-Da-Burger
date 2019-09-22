var express = require("express");

var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var yum = {
      burgers: data
    };
    console.log(yum);
    res.render("index", yum);
  });
});

router.get("/api/burgers", function(req, res) {
  burger.selectAll(function(data) {
    res.json(data);
  });
});

router.post("/api/burgers/create", function(req, res) {
  burger.insertOne(["burger_name"], [req.body.burger_name], function(data) {
    res.redirect("/");
  });
});

router.post("/api/burgers/update/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne({ devoured: true }, condition, function(data) {
    res.redirect("/");
  });
});

module.exports = router;
