const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const authRouter = require("./routes/auth");
const RestRouter = require("./routes/restaurant");
const { NotFoundError } = require("./utils/errors");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/restaurant", RestRouter);
app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`🚀 Server listening on port ` + port);
});
