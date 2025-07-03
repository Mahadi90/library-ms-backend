"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['https://library-ms-tau.vercel.app']
}));
app.use('/api/books', book_controller_1.bookRoute);
app.use('/api/borrow', borrow_controller_1.borrowRoute);
app.get('/', (req, res) => {
    res.send('Library management system server runnung.......');
});
exports.default = app;
