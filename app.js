require('dotenv').config('./.env');
const errorHandler = require('./middleware/ErrorHandler')
const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/users.routes')
const jwt = require('jsonwebtoken');
const pool = require('./Database/ConnectDatabase');
const moment = require('moment')
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdf-lib').PDFDocument

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable CORS credentials (cookies, headers)
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(errorHandler)

const port = process.env.PORT || 5000;

app.use('/api/proventech/users', userRoute)
app.use('/api/proventech/masters', require('./routes/masters.routes'))

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
app.post('/api/proventech/upload', upload.single('pdfFile'), (req, res) => {
    res.json({ message: 'File uploaded successfully' });
});

// API endpoint to get the list of file names
app.get('/api/proventech/files', (req, res) => {
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

app.post('/api/proventech/mergePdfs', upload.array('pdfFiles', 10), async (req, res) => {
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




app.post("/insertData", async (req, res) => {
    let creation_date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    console.log(creation_date)
    let query = `INSERT INTO tech_transfer_package (project_id, project_code, molecule_phase, tech_transfer_phase,creation_date,attachment_percentage,status,url
    ) values 
    ('DTT-04', 'GHJ', 'Phase-03','New', '${creation_date}',100,'Approved', 'http://localhost:3000/dashboard'),
    ('DTT-05', 'RTY', 'Phase-01','Addendum', '${creation_date}',40,'Rejected', 'http://localhost:3000/dashboard')
    `
    const client = await pool.connect();
    const dataInserted = await client.query(query);

    console.log(dataInserted)

    if (dataInserted.rowCount > 0) {
        if (client) client.release();
        return res.status(201).json({ error: "Data Inserted" });
    }
})


app.get("/dummy", (req, res, next) => {
    res.cookie("jwt_token", "govind", { httpOnly: true })
    return res.send({ message: "sent cookie" })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});