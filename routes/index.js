const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const imageHeader = require("../middleware/imageHeader");

let routes = (app) => {
  router.get("/", homeController.getHome);

  router.post("/upload", uploadController.uploadFiles);
  router.get("/files/:user", uploadController.getListFiles);
  router.get("/files/:image", imageHeader, uploadController.getImage);
  // router.get("/files/:name", uploadController.download);

  return app.use("/", router);
};

module.exports = routes;
