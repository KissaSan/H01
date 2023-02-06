"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("./validation");
const app = (0, express_1.default)();
const port = 3000;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
let db = [];
function makeNewVideo(data) {
    const { title, author, availableResolutions } = data;
    const date = new Date();
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return {
        id: db.length + 1,
        title,
        author,
        availableResolutions,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: nextDate.toISOString()
    };
}
app.get('/', (req, res) => {
    res.send('hello');
});
app.get('/videos', (req, res) => {
    res.send(db);
});
app.get('/videos/:id', (req, res) => {
    const video = db.find(v => v.id === +req.params.id);
    if (video) {
        res.send(video);
        return;
    }
    res.sendStatus(404);
});
app.post('/videos', (req, res) => {
    const errors = (0, validation_1.validateCreateVideoInputModel)(req.body);
    if (errors) {
        res.status(400).send(errors);
        return;
    }
    const video = makeNewVideo(req.body);
    db.push(video);
    res.send(video);
});
app.put('/videos/:id', (req, res) => {
    const index = db.findIndex(p => p.id === +req.params.id);
    if (index === -1) {
        res.sendStatus(404);
        return;
    }
    const errors = (0, validation_1.validateUpdateVideoInputModel)(req.body);
    if (errors) {
        res.status(400).send(errors);
        return;
    }
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    db[index] = Object.assign(Object.assign({}, db[index]), { title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        publicationDate });
    res.sendStatus(204);
});
app.delete('/testing/all-data', (req, res) => {
    db = [];
    res.sendStatus(204);
});
app.delete('/videos/:id', (req, res) => {
    const index = db.findIndex(p => p.id === +req.params.id);
    if (index == -1) {
        res.sendStatus(404);
        return;
    }
    db.splice(index, 1);
    res.sendStatus(204);
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
