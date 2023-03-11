const express = require("express");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12604533",
  password: "SZEguId4zI",
  database: "sql12604533",
});
const app = express();
const path = require("path");
var bodyParser = require("body-parser");

//Database Connection
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connnected...");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use("/static", express.static(path.join(__dirname, "public")));

// Use this route for create table in Database
app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE bookings_info(id int NOT NULL, booking_number varchar(255) NOT NULL, room_type varchar(255), room_number varchar(255), email TEXT(255), checkin_time DATETIME, checkout_time DATETIME, booking_time DATETIME, price varchar(255), PRIMARY KEY(booking_number))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Table Created Successfully");
  });
});

app.post("/", (req, res) => {
  var bookingNumber = "BKNB" + Math.floor(Math.random() * Math.pow(10, 10));
  var roomType = req.body.roomtype;
  var roomNumber = req.body.roomnum;
  var email = req.body.email;
  var checkinTime = req.body.checkin;
  var checkoutTime = req.body.checkout;
  var bookingTime = new Date();
  var price = req.body.pricename;

  let sql =
    "INSERT INTO bookings_info(booking_number, room_type, room_number, email, checkin_time, checkout_time, booking_time, price) VALUES(?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [
      bookingNumber,
      roomType,
      roomNumber,
      email,
      checkinTime,
      checkoutTime,
      bookingTime,
      price,
    ],
    (err, result) => {
      if (err) throw err;
    }
  );

  console.log(
    bookingNumber,
    roomType,
    roomNumber,
    email,
    checkinTime,
    checkoutTime,
    bookingTime,
    price
  );

  res.redirect("back");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen("3000", () => {
  console.log("Server started on port : 3000");
});
