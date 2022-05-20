"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const app = (0, express_1.default)();
app.get('/api/images', (req, res) => {
    const fileName = req.query.fileName;
    const width = req.query.width;
    const height = req.query.height;
    if (!fileName || !width || !height) {
        //throw exception
        console.log('Mandatory input is missing');
        res.status(400);
        res.send('Mandatory input is missing');
        return;
    }
    const thumbPath = path_1.default.resolve(`./assets/thumb/${fileName}_thumb_${width}_${height}.jpg`);
    const fullPath = path_1.default.resolve(`./assets/full/${fileName}.jpg`);
    if (fs_1.default.existsSync(thumbPath)) {
        console.log('found as thumb');
        res.sendFile(thumbPath);
    }
    else {
        console.log('resize full image');
        if (!fs_1.default.existsSync(fullPath)) {
            console.log('File not found');
            res.send('File not found');
            return;
        }
        (0, sharp_1.default)(fullPath)
            .resize(+width, +height)
            .toFile(thumbPath, function (err) {
            if (!err)
                res.sendFile(thumbPath);
        });
    }
});
// start express server
app.listen(3000, () => {
    console.log('Server is starting at port: 3000');
});
exports.default = app;
