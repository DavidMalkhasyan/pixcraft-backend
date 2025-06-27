import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "pixcraft",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 800, crop: "limit" }],
  },
});

export default storage;