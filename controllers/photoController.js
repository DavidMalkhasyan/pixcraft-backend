import PhotoService from "../services/photoService.js";

class PhotoController {
  async uploadPhoto(req, res) {
    const result = await PhotoService.uploadPhoto(req);
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json({ error: result.error });
    }
  }

  async updatePhoto(req, res) {
    const result = await PhotoService.updatePhoto(req);
    if (result.success) {
      res.json(result.data);
    } else {
      res.status(500).json({ error: result.error });
    }
  }

  async updateCaption(req, res) {
    const result = await PhotoService.updateCaption(req);
    if (result.success) {
      res.json({ message: "Описание обновлено", caption: result.data.caption });
    } else {
      res.status(500).json({ error: result.error });
    }
  }

  async getMyPhotos(req, res) {
    const result = await PhotoService.getPhotosByUser(req.user.userId);
    res.json(result);
  }

  async deletePhoto(req, res) {
    const result = await PhotoService.deletePhoto(req);
    if (result.success) {
      res.json({ message: "Photo deleted successfully" });
    } else {
      res.status(500).json({ error: result.error });
    }
  }
}

export default new PhotoController();
