import express from "express";
import Student from "../modal/Student.js";
import { StudentRegisterValidation } from "../validation/joi.js";
import CryptoJS from "crypto-js";
import { upload } from "../middlewhere/multer.js"; // Corrected the import statement
import fs from "fs";
import uploadToCloudinary from "../utils/upload.js";

const router = express.Router();

router.post('/createstudent', upload.single('file'), async (req, res) => {
  console.log("req.body ", req.body);

  try {
    const { error } = StudentRegisterValidation.validate(req.body);

    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { password } = req.body;
    const hashPass = CryptoJS.AES.encrypt(password, process.env.PASS_KEY).toString();

    // Process the uploaded file
    const uploadedFile = req.file;
    let fileUrl = null;

    if (uploadedFile) {
      try {
        const cloudinaryUrl = await uploadToCloudinary(uploadedFile.path);
        fileUrl = cloudinaryUrl;
        fs.unlinkSync(uploadedFile.path);
      } catch (error) {
        console.error(error);
        fs.unlinkSync(uploadedFile.path);
        return res.status(500).send({ message: 'Error uploading file' });
      }
    }

    // Create a new student object with the file URL (if available)
    const newStudent = new Student({
      ...req.body,
      image: fileUrl, 
      password: hashPass,
    });
console.log("fileUrl",fileUrl)
    await newStudent.save();

    res.status(200).send({ message: "Student Registration successfully", data: newStudent });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error", msg: err });
  }
});






export default router;


