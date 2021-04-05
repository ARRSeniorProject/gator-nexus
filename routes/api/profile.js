const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

const router = express.Router();

require('dotenv').config({path: path.resolve(__dirname, '../../.env')});

const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    Bucket: process.env.BUCKET
});

const profilePictureUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'gator-nexus',
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: {fileSize: 2000000},
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('profilePicture');

function checkFileType(file, cb) {
    const validFileTypes = /jpeg|jpg|png|gif/;
    const extensionName = validFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = validFileTypes.test(file.mimetype);
    if(mimeType && extensionName) {
        return cb(null, true);
    } 
    else {
        cb('Error: Invalid File Type');
    }
}

router.post( '/upload', (req, res) => {
    profilePictureUpload(req, res, (error) => {
        if(error) {
            res.json('Error: ' + error);
        }
        else {
            if(req.file === undefined) {
                res.json('Error: No File Selected');
            } 
            else {
                const imageName = req.file.key;
                const imageLocation = req.file.location;
                res.json({
                    image: imageName,
                    location: imageLocation
                });
            }
        }
    });
});

module.exports = router;