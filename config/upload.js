import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (image) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const uploadResult = await new Promise((resolve) => {
      cloudinary.v2.uploader
        .upload_stream((error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(image);
    });

    return uploadResult;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
