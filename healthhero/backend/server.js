const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const authRouter = require("./routes/auth");
const RestRouter = require("./routes/restaurant");
const CommRouter = require("./routes/community");
const { NotFoundError } = require("./utils/errors");
const security = require("./middleware/security");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use(security.extractUserFromJwt);
app.use("/auth", authRouter);
app.use("/restaurant", RestRouter);
app.use("/communities", CommRouter);

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  console.log(err.stack);
  return res.status(status).json({
    error: { message, status },
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`🚀 Server listening on port ` + port);
});
