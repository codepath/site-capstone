const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { BadRequestError, NotFoundError } = require("./utils/errors");

const app = express();

// Define the allowed origins
const allowedOrigins = ["http://localhost:5174", "http://localhost:5173","https://nomadiabe.onrender.com"];

// CORS middleware with custom origin function
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("tiny"));

const hotelsRouter = require('./routes/hotels');
const activitiesRouter = require('./routes/activities');
const userRouter = require('./routes/user');
const thingstodoRouter = require('./routes/things-to-do');
const flightsRouter = require('./routes/flights');

console.log("entered server");

app.use('/api', hotelsRouter);
app.use('/api', thingstodoRouter);
app.use('/api', userRouter);
app.use('/api', flightsRouter);
app.use('/', activitiesRouter);

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json({
    error: { message, status }
  });
});

const PORT = process.env.PORT || 3009;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
