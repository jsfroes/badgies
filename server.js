const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const corsOptions = {
    origin: "http://localhost:3000"
  };

// use cors options for frontend route
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// format http server requests
app.use(morgan('tiny'))

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to badgies application." });
  });

// connect to the db
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// connect routes
require("./routes/badges.routes")(app);

// set port listen to requests
const PORT = 8080 | process.env.PORT
app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}!`)
})

