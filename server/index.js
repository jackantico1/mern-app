import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouthes from './routes/auth.js';
import { register } from './controllers/auth.js';

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

// this will set the directory of where we keep our assets
// we're going to store this locally, in a real life produciton app we'd store this in
// cloud storage like S3
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// File Storage, this is for when people save files to the website
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });


// Routes with files
// this is middleware function, the register function is a controller
app.post('/auth/register', upload.single("picture"), register);

// Routes
app.use('/auth', authRouthes);

// Mongoose setup

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => 
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)
)).catch((error) => console.log(error.message));
