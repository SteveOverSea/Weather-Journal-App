const express = require("express");
const app = express();

// since Express v4.16+ body-parser is already included with express
// const bodyParser = require("body-parser") is deprecated
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use(express.static('public'));

const port = 8080;
let projectData = {};

const server = app.listen(port, () => console.log("running on localhost port " + port));

app.get("/getAll", (req, res) => {
    console.log("Provided Data:")
    console.log(projectData);
    res.send(projectData);
});

app.post("/add", (req, res) => {
    projectData = req.body;
    console.log("Received Data:")
    console.log(req.body);
    res.send("ok");
});