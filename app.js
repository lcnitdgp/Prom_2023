const express = require("express");
const mysql = require("mysql2");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const PORT = process.env.PORT | 3000;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Student = require("./models/Student");

//Set view-engine to ejs
app.set("view engine", "ejs");

//Use "public" folder
app.use(express.static("public"));

//Use method-override and body-parser
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

//home page
// app.get("*", function (req, res) {
//   res.render("difficulty");
// });

// home page
app.get("/", function (req, res) {
  res.render("index");
});

app.post("/dept", function (req, res) {
  var dept = req.body.dept;
  res.redirect("/" + dept);
});

app.get("/error", (req, res) => {
  console.log("Error page");
  res.render("error");
});

app.get("/thankyou", (req, res) => {
  console.log("Thank You page");
  res.render("submit");
});

//form page
app.get("/:dept", function (req, res) {
  var dept = req.params.dept.toUpperCase();
  console.log(dept);

  if (dept == "BT") {
    var num = 8065;
    var dept2 = "BT";
    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos: [],
    });
  } else if (dept == "CE") {
    var num = 8064;
    var dept2 = "CE";
    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos: [],
    });
  } else if (dept == "CHE") {
    var num = 8063;
    var dept2 = "CH";
    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos: [],
    });
  } else if (dept == "CSE") {
    var num = 8166;
    var dept2 = "CS";
    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos: [],
    });
  } else if (dept == "ECE") {
    var num = 8085;
    var dept2 = "EC";
    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos: [],
    });
  } else if (dept == "EE") {
    var num = 8085;
    var dept2 = "EE";
    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos: [],
    });
  } else if (dept == "ME") {
    var num = 8158;
    var dept2 = "ME";
    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos: [],
    });
  } else if (dept == "MME") {
    var num = 8061;
    var dept2 = "MM";
    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos: [],
    });
  }else if (dept == "CY") {
    var num = 8000;
    var dept2 = "CY";
    var additionalRollNos = [
      "18CY1001",
      "18CY1003",
      "18CY1004",
      "18CY1005",
      "18CY1006",
      "18CY1007",
      "18CY1008",
      "18CY1009",
      "18CY1010",
      "18CY1011",
      "18CY1012",
      "18CY1015",
      "17CY1011"
    ];

    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos,
    });

  }else if (dept == "IT") {
    var num = 8000;
    var dept2 = "IT";
    var additionalRollNos = [
      "17IT8022"
    ];

    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos,
    });

  } else if (dept == "DD-BT") {
    var num = 8000;
    var dept2 = "DD-BT";
    var additionalRollNos = [
      "18BT1001",
      "18BT1002",
      "18BT1003",
      "18BT1004",
      "18BT1005",
    ];

    console.log(additionalRollNos);

    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos,
    });
  } else if (dept == "DD-CH") {
    var num = 8000;
    var dept2 = "DD-CH";
    var additionalRollNos = ["18CH1001", "18CH1002", "18CH1004"];

    res.render("form", {
      dept: dept,
      num: num,
      dept2: dept2,
      additionalRollNos,
    });
  } else res.render("unknown");
});

//form upload
app.post("/submit", function (req, res) {
  var { name, department, roll_no, phone, email, clubs, wing, quote } =
    req.body;

  console.log(name, department, roll_no, phone, email, clubs, wing, quote);

  cloudinary.uploader.upload(
    req.body.photo,
    {
      folder: process.env.CLOUDINARY_FOLDER_NAME,
    },
    async (error, result) => {
      console.log(error, result);

      if (error) {
        console.log(error);
        return res.send({ error });
      }

      try {
        const student = await Student.create({
          name,
          department,
          roll_no,
          phone,
          email,
          clubs,
          wing,
          quote,
          photo: result.url,
        });

        console.log(student);
        res.send({ success: "The student has been added to the database" });
      } catch (err) {
        console.log(err);
        res.json({ error: err });
      }
    }
  );
});

//connect to node
app.listen(PORT, function (err) {
  if (err) throw err;
  else {
    console.log(`Server is running on PORT: ${PORT}`);
  }
});
