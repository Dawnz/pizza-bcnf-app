const express = require("express");
const app = express();
const users = require("./routes/users");
const orders = require("./routes/orders");
const toppings = require("./routes/toppings");
const toppingTypes = require("./routes/toppingType");
const auth = require("./routes/auth");
const conn = require("./lib/db");
const session = require("express-session");
//optional aprams
// const path = require("path");
// var session = require("express-session");
// var cookieParser = require("cookie-parser");
// var flash = require("express-flash");

app.use(
   express.urlencoded({
      extended: true,
   })
);
app.use(express.json());

app.use(
   session({
      secret: "ecQJ099i5JLW15yU4lnktvrBjiPUuKeJ",
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 120000 },
   })
);
// app.use(flash())

//connection info
app.use("/login", auth);
app.use("/users", users);
app.use("/orders", orders);
app.use("/toppings", toppings);
app.use("/topping-type", toppingTypes);

//session code
// app.use(cookieParser());
// app.use(cookieParser());
// app.use(
//    session({
//       secret: "secret code 3245",
//       resave: false,
//       saveUninitialized: true,
//       cookie: { maxAge: 120000 },
//    })
// );

//sample post with login
// app.post("/authlogin", function (req, res, next) {
//    var email = req.body.email;
//    var password = req.body.password;
//    console.log(req.body);

//    // connection.query("SELECT * FROM login WHERE  email = '"+ email  +"' AND BINARY password = '"+ password +"'", function(err, rows, fields) {
//    conn.query(
//       "SELECT * FROM amberorder.users WHERE email = ? AND password = ?",
//       // "SELECT * FROM amberorder.users",
//       [email, password],
//       function (err, results) {
//          //if(err) throw err

//          // if login is incorrect or not found
//          // console.log(results);
//          if (results.length <= 0) {
//             if (err) throw err;
//             req.flash("error", "Invalid credentials Please try again!");
//             res.redirect("/login");
//          } else {
//             // if login found
//             //Assign session variables based on login credentials
//             req.session.loggedin = true;
//             req.session.username = results[0].username;
//             req.session.email = results[0].email;
//             req.session.role = results[0].role;
//             console.log(req.session);
//             res.redirect("/orders");
//          }
//       }
//    );
// });

app.listen(4000, (req, res) => {
   console.log("Express running on port 4000");
});
