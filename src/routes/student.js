
//single images form

// import express from "express";
// import Student from "../modal/Student.js";
// import { StudentRegisterValidation } from "../validation/joi.js";
// import CryptoJS from "crypto-js";
// import { upload } from "../middlewhere/multer.js"; // Corrected the import statement
// import fs from "fs";
// import uploadToCloudinary from "../utils/upload.js";

// const router = express.Router();

// router.post('/createstudent', upload.single('file'), async (req, res) => {
//   console.log("req.body ", req.body);

//   try {
//     const { error } = StudentRegisterValidation.validate(req.body);

//     if (error) {
//       return res.status(400).send({ error: error.details[0].message });
//     }

//     const { password } = req.body;
//     const hashPass = CryptoJS.AES.encrypt(password, process.env.PASS_KEY).toString();

//     // Process the uploaded file
//     const uploadedFile = req.file;
//     let fileUrl = null;

//     if (uploadedFile) {
//       try {
//         const cloudinaryUrl = await uploadToCloudinary(uploadedFile.path);
//         fileUrl = cloudinaryUrl;
//         fs.unlinkSync(uploadedFile.path);
//       } catch (error) {
//         console.error(error);
//         fs.unlinkSync(uploadedFile.path);
//         return res.status(500).send({ message: 'Error uploading file' });
//       }
//     }

//     // Create a new student object with the file URL (if available)
//     const newStudent = new Student({
//       ...req.body,
//       image: fileUrl,
//       password: hashPass,
//     });

//     // Save the student to the database
//     await newStudent.save();

//     // Destructure the password from the newStudent object
//     const { password: excludedPassword, ...responseData } = newStudent.toObject();

//     console.log("fileUrl", fileUrl);

//     // Send only necessary information to the frontend
//     res.status(200).send({ message: "Student Registration successfully", data: responseData });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Internal Server Error", msg: err });
//   }
// });

// export default router;



//multiply Images for form
import express from "express";
import Student from "../modal/Student.js";
import { StudentRegisterValidation } from "../validation/joi.js";
import CryptoJS from "crypto-js";
import { upload } from "../middlewhere/multer.js"; // Corrected the import statement
import fs from "fs";
import uploadToCloudinary from "../utils/upload.js";

const router = express.Router();

router.post('/createstudent', upload.array('files', 5), async (req, res) => {
  console.log("req.body ", req.body);

  try {
    const { error } = StudentRegisterValidation.validate(req.body);

    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { password } = req.body;
    const hashPass = CryptoJS.AES.encrypt(password, process.env.PASS_KEY).toString();

    // Process the uploaded files
    const uploadedFiles = req.files;
    let fileUrls = [];

    if (uploadedFiles && uploadedFiles.length > 0) {
      try {
        for (const file of uploadedFiles) {
          const cloudinaryUrl = await uploadToCloudinary(file.path);
          fileUrls.push(cloudinaryUrl);
          fs.unlinkSync(file.path);
        }
      } catch (error) {
        console.error(error);
        uploadedFiles.forEach(file => fs.unlinkSync(file.path));
        return res.status(500).send({ message: 'Error uploading files' });
      }
    }

    // Create a new student object with the file URLs (if available)
    const newStudent = new Student({
      ...req.body,
      images: fileUrls,  // Assuming your student schema has a field named 'images'
      password: hashPass,
    });

    // Save the student to the database
    await newStudent.save();

    // Destructure the password from the newStudent object
    const { password: excludedPassword, ...responseData } = newStudent.toObject();

    console.log("fileUrls", fileUrls);

    // Send only necessary information to the frontend
    res.status(200).send({ message: "Student Registration successfully", data: responseData });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error", msg: err });
  }
});

export default router;
