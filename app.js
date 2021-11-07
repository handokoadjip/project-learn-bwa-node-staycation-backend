var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
var cors = require("cors");
// middleware
const auth = require("./middleware/auth");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// admin
const dashboardRouter = require("./routes/admin/dashboard");
const categoryRouter = require("./routes/admin/category");
const bankRouter = require("./routes/admin/bank");
const vacationRouter = require("./routes/admin/vacation");
const bookingRouter = require("./routes/admin/booking");
const detailRouter = require("./routes/admin/detail");
const featureRouter = require("./routes/admin/feature");
const trasureRouter = require("./routes/admin/treasure");

// admin api
const categoryApiRouter = require("./routes/admin/api/category");
const bankApiRouter = require("./routes/admin/api/bank");
const vacationApiRouter = require("./routes/admin/api/vacation");
const featureApiRouter = require("./routes/admin/api/feature");
const treasureApiRouter = require("./routes/admin/api/treasure");
const bookingApiRouter = require("./routes/admin/api/booking");
const generalApiRouter = require("./routes/admin/api/general");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// method spoofing
app.use(methodOverride("_method"));

// set session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

// set flash-session
app.use(flash());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// static vendor
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

app.use(
  "/swal",
  express.static(path.join(__dirname, "node_modules/sweetalert2"))
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// admin api
app.use(
  "/v1/api",
  cors(),
  categoryApiRouter,
  bankApiRouter,
  vacationApiRouter,
  featureApiRouter,
  treasureApiRouter,
  bookingApiRouter,
  generalApiRouter
);

// middleware use
app.use(auth);

// admin
app.use(
  "/admin",
  dashboardRouter,
  categoryRouter,
  bankRouter,
  vacationRouter,
  detailRouter,
  featureRouter,
  trasureRouter,
  bookingRouter
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
