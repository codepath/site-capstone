const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { BadRequestError, NotFoundError } = require("./utils/errors");

const fs = require('fs'); 


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const hotelsRouter = require('./routes/hotels');
const activitiesRouter = require('./routes/activities');
const userRouter = require('./routes/user');
const thingstodoRouter = require('./routes/things-to-do');
const flightsRouter = require('./routes/flights');






console.log("entered server")

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
        error: { message, status}
    });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
