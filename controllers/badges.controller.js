const db = require("../models");
const Badges = db.badges;

// Create and Save a new Badges
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Badge
    const badge = new Badge({
      title: req.body.title,
    });
  
    // Save badge in the database
    badge
      .save(badge)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the badge."
        });
      });
  };
  

// Retrieve all Badgess from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Badges with an id
exports.findOne = (req, res) => {
  
};

// Update a Badges by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Badges with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Badgess from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};
