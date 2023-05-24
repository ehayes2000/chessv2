"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8080;
const root_dir = null;
const static_client = __dirname.split('/').slice(0, -2).join('/') + '/client/build';
app.use(express_1.default.static(static_client));
app.get('/', (req, res) => {
    console.log('get made');
    res.sendFile(static_client + '/index.html');
});
app.listen(port, () => {
    console.log(static_client);
    console.log(`[Server]: I am running at https://localhost:${port}`);
});
