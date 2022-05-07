const express = require("express");
const app = express();
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();
const userroute = require("./Routes/users.js");
const postroute = require("./Routes/posts.js");
const commroute = require("./Routes/comments.js");
const announcementroute = require("./Routes/announcements.js");
const antcommentroute = require("./Routes/announcementComment.js");
const passport = require('passport');
const { cloudinary } = require('./utils/cloudinary');

const expressFormData = require('express-form-data');
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,


}
)
    .then(
        console.log("Connected to mongo")
    )
    .catch((err) =>
        console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Also tell express to read HTTP form data
app.use(expressFormData.parse());
app.use(cors());
//middleware
app.use(passport.initialize());


//passport Config
require("./JWT/passport.js")(passport);




app.use("/user", userroute);
app.use("/post", postroute);
app.use("/comments", commroute);
app.use("/announcement", announcementroute);
app.use("/antComment", antcommentroute);








app.get("/",
    (req, res) => {
        res.send("Welcome");
    })



app.listen(process.env.PORT || 3001,
    () => {
        console.log("Connected to localhost 3001")
    })