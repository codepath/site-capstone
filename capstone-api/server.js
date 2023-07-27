const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { BadRequestError, NotFoundError } = require("./utils/errors");

const fs = require('fs'); 

require('graceful-fs').gracefulify(fs);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const hotelsRouter = require('./routes/hotels');
const favoritesRouter = require('./routes/favorites');
const activitiesRouter = require('./routes/activities');
const itinerariesRouter = require('./routes/itineraries');
const userRouter = require('./routes/user');
const thingstodoRouter = require('./routes/things-to-do');



console.log("entered server")

app.use('/api', hotelsRouter);
app.use('/api', thingstodoRouter);

app.use('/', favoritesRouter);
app.use('/', activitiesRouter);
app.use('/', itinerariesRouter);
app.use('/', userRouter);





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
