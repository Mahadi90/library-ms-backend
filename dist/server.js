"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server;
const port = process.env.PORT;
function main() {
    try {
        mongoose_1.default.connect(`${process.env.DATABASE_URL}`);
        console.log('Server connected to mongoose database');
        server = app_1.default.listen(port, () => {
            console.log(`Library management system express server running on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
