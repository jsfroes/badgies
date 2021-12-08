const upload = require("../middleware/upload");
const dbConfig = require("../config/db");
const db = require("../models");
const User = db.users;

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = dbConfig.url;

const baseUrl = "http://localhost:8080/files/";

const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
  try {
    console.log("uploading files");
    await upload(req, res);
    const uploadedBadges = req.files;

    // validate file quantity
    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    let badges = [];
    await uploadedBadges.forEach((badge) => {
      badges.push(badge.filename);
    });
    console.log("badgesArray", badges);

    // connect to DB and create a user with the images
    await mongoClient.connect();
    const database = mongoClient.db(dbConfig.database);
    const user = database.collection(dbConfig.user);

    const newUser = await user.insertOne({
      name: req.body.user,
      images: badges,
    });

    console.log("newUser", newUser);

    // json response
    return res.status(200).send({
      message: "Files have been uploaded.",
      users: uploadedBadges,
    });
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });
  }
};

const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(dbConfig.database);
    const user = database.collection(dbConfig.user);

    const cursor = await user.findOne({ name: req.params.user });

    res.status(200).send(cursor);

    // if ((await cursor.count()) === 0) {
    //   return res.status(500).send({
    //     message: "No files found!",
    //   });
    // }

    let userInfo;
    // await cursor.forEach;

    //     let userInfo = [];
    //     await cursor.forEach((doc, index) => {
    //       userInfo.push({ name: doc.name });
    // =
    //       console.log(`index`, userIndex);
    //       doc.images.forEach((badge) => {
    //         console.log(userInfo, userIndex);

    //         // userInfo[index].images.push(badge);
    //       });
    //       // console.log(doc);
    // loop
    // image
    // userInfo.push({ name: doc.name, images: doc.images });
    // });

    return res.status(200).send(userInfo);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

// Download

// const download = async (req, res) => {
//   try {
//     await mongoClient.connect();

//     const database = mongoClient.db(dbConfig.database);
//     const bucket = new GridFSBucket(database, {
//       bucketName: dbConfig.imgBucket,
//     });

//     let downloadStream = bucket.openDownloadStreamByName(req.params.name);

//     downloadStream.on("data", function (data) {
//       return res.status(200).write(data);
//     });

//     downloadStream.on("error", function (err) {
//       return res.status(404).send({ message: "Cannot download the Image!" });
//     });

//     downloadStream.on("end", () => {
//       return res.end();
//     });
//   } catch (error) {
//     return res.status(500).send({
//       message: error.message,
//     });
//   }
// };

module.exports = {
  uploadFiles,
  getListFiles,
  // download,
};
