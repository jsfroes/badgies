module.exports = app => {
    const badges = require("../controllers/badges.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", badges.create);
  
    // Retrieve all badges
    router.get("/", badges.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", badges.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", badges.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", badges.delete);
  
    app.use('/api/badges', router);
  };
  