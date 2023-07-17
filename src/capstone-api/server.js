const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { BadRequestError, NotFoundError } = require("./utils/errors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const hotelsRouter = require('./routes/hotels');

console.log("entered server")

app.use('/api', hotelsRouter);




app.use((req, res, next) => {
    
    return next(new NotFoundError());
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
        error: { message, status}
    });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
