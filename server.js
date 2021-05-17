import express from 'express';
import multer from 'multer';

const app = express();
app.use('/', express.static('client'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'client/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname + '.pdf');
    },
});

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
        fileName: "uploads/somepdf.pdf",
    },
];

app.get(('/files'), (req, res) => {
    res.json(uploads);
});

// uploader.single(<NAME>) must be same as <input type="file" name=<NAME> in index.html and payload.append('<NAME>', file) in index.js
app.post(('/upload'), uploader.single('pdfFile'), express.json(), (req, res) => {
    const obj = {
        text: req.body.text,
        fileName: 'uploads/' + req.file.filename, // filename is set in the uploader
    };
    uploads.push(obj);
});

app.listen(8080, (e) => {
    console.log(`server ${e ? 'failed to start' : 'listening'}`);
});