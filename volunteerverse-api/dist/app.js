"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const volunteer_1 = require("./routes/volunteer");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/volunteer", volunteer_1.volunteerRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(config_1.PORT, () => {
    return console.log(`Express is listening at http://localhost:${config_1.PORT}`);
});
//# sourceMappingURL=app.js.map