const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// const aws = require("ibm-cos-sdk");
// const aws = require("aws-sdk");
// const multerS3 = require("multer-s3")
// var ep = new aws.Endpoint('https://s3.us-south.cloud-object-storage.appdomain.cloud');
// var s3 = new aws.S3({endpoint: ep, region: 'us-south'});

// var config = {
//   endpoint: "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
//   apiKeyId: "ouXqcLMnpIo3o61-IhQqLtSGvvrbERj9zxS_yPMskHTw",
//   serviceInstanceId:
//     "crn:v1:bluemix:public:cloud-object-storage:global:a/9335c3383bd3418682a98e1973767233:2aee272f-a4ec-497b-ad21-e126ef93dfd6::",
//   signatureVersion: "iam",
// };

// var cos = new aws.S3(config);

const storageType = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          cb(err);
        }
        file.key = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, file.key);
      });
    },
  }),

    
  // s3: multerS3({
  //   s3: new aws.S3({endpoint: ep, region: 'us-south'}),
  //   bucket: "uploadexample2",
  //   key: (req, file, cb) => {
  //     crypto.randomBytes(16, (err, hash) => {
  //       if (err) {
  //         cb(err);
  //       }
  //       const fileName = `${hash.toString("hex")}-${file.originalname}`;
  //       cb(null, fileName);
  //     });
  //   },
  // }),

//   s3:  multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: myBucket,
//         key: function (req, file, cb) {
//             cb(null, file.originalname);
//             console.log(file);
//         }
//     })
// })
};

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageType[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/pjeg",
      "image/png",
      "image/gif",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};
