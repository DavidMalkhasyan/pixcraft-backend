import sharp from "sharp";
import cloudinary from "../config/cloudinary.js";
import Photo from "../models/Photo.js";

class PhotoService {
  async uploadPhoto(req) {
    try {
      const resizedImage = await sharp(req.file.buffer)
        .resize(800, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toBuffer();

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "pixcraft" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(resizedImage);
      });

      const photo = new Photo({
        url: result.secure_url,
        public_id: result.public_id,
        user: req.user.userId,
        caption: req.body.caption || "",
        album: req.body.album || "Общие",
      });

      await photo.save();

      return { success: true, data: photo };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  async updatePhoto(req) {
    try {
      const photo = await Photo.findById(req.params.id);
      if (!photo || photo.user.toString() !== req.user.userId) {
        return { success: false, error: "Not sucses" };
      }

      await cloudinary.uploader.destroy(photo.public_id);

      const resizedImage = await sharp(req.file.buffer)
        .resize(800, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toBuffer();

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "pixcraft" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(resizedImage);
      });

      photo.url = result.secure_url;
      photo.public_id = result.public_id;
      photo.uploadedAt = Date.now();
      await photo.save();

      return { success: true, data: photo };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  async updateCaption(req) {
    try {
      const photo = await Photo.findById(req.params.id);
      if (!photo || photo.user.toString() !== req.user.userId) {
        return { success: false, error: "Not sucses" };
      }

      photo.caption = req.body.caption || "";
      await photo.save();

      return { success: true, data: photo };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  async getPhotosByUser(userId) {
    return await Photo.find({ user: userId }).sort({ uploadedAt: -1 });
  }

  async deletePhoto(req) {
    try {
      const photo = await Photo.findById(req.params.id);
      if (!photo || photo.user.toString() !== req.user.userId) {
        return { success: false, error: "Not sucses" };
      }

      await cloudinary.uploader.destroy(photo.public_id);
      await photo.deleteOne();

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}

export default new PhotoService();