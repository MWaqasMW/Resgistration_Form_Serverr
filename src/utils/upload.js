import { v2 as cloudinary  } from "cloudinary";

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


async function uploadToCloudinary(filePath) {
  try {
    const response = await cloudinary.uploader.upload(filePath);
    console.log("response===============",response)
    return response.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default uploadToCloudinary;