import { Request, Response } from "express";
import Gallery from "../models/Gallery";

export const createGallery = async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.create(req.body);
    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ error: "Unable to create gallery" });
  }
};

export const getAllGalleries = async (_req: Request, res: Response) => {
  try {
    const galleries = await Gallery.findAll();
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch galleries" });
  }
};

export const updateGallery = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Gallery.update(req.body, { where: { id } });
    const updatedGallery = await Gallery.findByPk(id);
    res.status(200).json(updatedGallery);
  } catch (error) {
    res.status(500).json({ error: "Unable to update gallery" });
  }
};

export const deleteGallery = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Gallery.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unable to delete gallery" });
  }
};
