import express from 'express';
import {Video, CreateVideoInputModel} from './interface';
import {validateCreateVideoInputModel, validateUpdateVideoInputModel} from "./validation";
const app = express();
const port = 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);


let db: Video[] = [];

function makeNewVideo(data: CreateVideoInputModel): Video {
    const {
        title,
        author,
        availableResolutions
    } = data;

    const date = new Date();
    const nextDate =  new Date(date);
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

app.get('/hometask_01/api/videos', (req, res) => {
    res.send(db);
})

app.get('/hometask_01/api/videos/:id', (req, res) => {
    const video = db.find(v => v.id === +req.params.id);

    if (video) {
        res.send(video);
        return;
    }

    res.sendStatus(404);
})

app.post('/hometask_01/api/videos', (req , res) => {
    const errors = validateCreateVideoInputModel(req.body);

    if (errors) {
        res.status(400).send(errors);
        return;
    }

    const video = makeNewVideo(req.body);
    db.push(video);
    res.send(video);
})

app.put('/hometask_01/api/videos/:id', (req, res) => {
    const index = db.findIndex(p => p.id === +req.params.id);

    if (index === -1) {
        res.sendStatus(404);
        return;
    }

    const errors = validateUpdateVideoInputModel(req.body);

    if (errors) {
        res.status(400).send(errors);
        return;
    }

    const {
        title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        publicationDate
    } = req.body;

    db[index] = {
        ...db[index],
        title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        publicationDate
    }

    res.sendStatus(204);
})

app.delete('/ht_01/api/testing/all-data', (req, res) => {
     db = [];
     res.sendStatus(204);
})

app.delete('/hometask_01/api/videos/:id', (req, res) => {
    const index = db.findIndex(p => p.id === +req.params.id);

    if (index == -1) {
        res.sendStatus(404);
        return;
    }

    db.splice(index,1);
    res.sendStatus(204);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})