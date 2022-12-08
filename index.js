const express = require("express");
const dotenv = require("dotenv");
const mongo = require("./connect");
const registerRouter = require("./Router/registerRouter");
const empolyeeRouter = require("./Router/empolyeeRouter");
const authModule = require("./Module/authModule");
const projectRouter = require("./Router/projectRouter")
const cors = require("cors");
const app = express();

app.use(cors());
//ENV CONNECTION
dotenv.config();
//DB CONNECTION
mongo.connect();
//ENBUILD METHOD
app.use(express.json());

app.use("/register", registerRouter);
app.use("/project", projectRouter);
//app.use("/", authModule.authenticateUser);
app.use("/empolyee", empolyeeRouter);


//LOCALHOST
app.listen(process.env.PORT || 5001);
