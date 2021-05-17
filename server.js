import express from 'express';
import multer from 'multer';

const app = express();
app.use('/', express.static('client'));

// const storage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         cb(null, 'client/uploads');
//     },
//     filename: (req, res, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     },
// });

const uploader = multer({
    dest: 'client/uploads',
    limits: {
        fields: 10,
        fileSize: 1024 * 1024 * 20,
        files: 1,
    },
});
// const upload = multer({ storage: storage });

const uploads = [
    {
        text: "wagwan piffting",
        fileName: "somepdf.pdf",
    },
];

app.get(('/files'), (req, res) => {
    res.json(uploads);
});

app.post(('/upload'), uploader.single('pdfFile'), express.json(), (req, res) => {
    console.log(req.file);
    console.log('this was called');
    const obj = {
        text: req.body.text,
        fileName: './uploads/' + req.file.filename,
    };
    uploads.push(obj);
});

app.listen(8080, (e) => {
    console.log(`server ${e ? 'failed to start' : 'listening'}`);
});