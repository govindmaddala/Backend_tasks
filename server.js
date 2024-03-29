require('dotenv').config('./.env');
const express = require("express");
const app = express();
const http = require("http");
const cors = require('cors')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const { apiRoute } = require('./routes/nodeRoues.routes');
const morgan = require('morgan')
app.use(morgan('dev'))
const dbConnect = require('./databases/ConnectDb')
const server = http.createServer(app);
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdf-lib').PDFDocument

var io = require("socket.io")(server, {
    cors: {
        // origin: "*",
        origin: "http://localhost:3000",
    },
});

app.use("/getNodeMessage/", apiRoute);
app.use("/api", apiRoute);

const uploadFolder = 'uploads';
// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder);
        }
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Handle PDF file uploads
app.post('/api/upload-files', upload.single('pdfFile'), (req, res) => {
    res.json({ message: 'File uploaded successfully' });
});

// API endpoint to get the list of file names
app.get('/api/get-all-files', (req, res) => {
    const files = getFilesInUploadsFolder();
    res.json({ files });
});

// Function to get the list of file names in the "uploads" folder
function getFilesInUploadsFolder() {
    const folderPath = path.join(__dirname, uploadFolder);
    try {
        // Read the files in the folder
        const files = fs.readdirSync(folderPath);
        return files;
    } catch (error) {
        console.error('Error reading files:', error);
        return [];
    }
}

const outputFolder = "Output"

app.post('/api/mergePdfs', upload.array('pdfFiles', 10), async (req, res) => {
    try {
        const files = getFilesInUploadsFolder();
        const folderPath = path.join(__dirname, uploadFolder);
        var pdfsToMerge = []
        files.forEach((each) => {
            pdfsToMerge.push(fs.readFileSync(`${folderPath}/${each}`))
        })

        const mergedPdf = await PDFDocument.create();
        for (const pdfBytes of pdfsToMerge) {
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => {
                mergedPdf.addPage(page);
            });
        }

        const buf = await mergedPdf.save();        // Uint8Array
        let mergedPath = 'merged.pdf';
        fs.open(mergedPath, 'w', function (err, fd) {
            fs.write(fd, buf, 0, buf.length, null, function (err) {
                fs.close(fd, function () {
                    res.json({ message: 'PDFs uploaded and merged successfully' });
                });
            });
        });

    } catch (error) {
        console.error('Error uploading and merging PDFs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const port = process.env.PORT || 5123

server.listen(port, async () => {
    dbConnect.databaseConnect("chatApp", "users")
    console.log(`App is listening on ${port}`);
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;