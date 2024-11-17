import { Request, Response } from "express";
import News from "../models/News";

export const createNews = async (req: Request, res: Response) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: "Unable to create news" });
  }
};

export const getAllNews = async (_req: Request, res: Response) => {
  try {
    const news = await News.findAll();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch news" });
  }
};

export const updateNews = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await News.update(req.body, { where: { id } });
    const updatedNews = await News.findByPk(id);
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: "Unable to update news" });
  }
};

export const deleteNews = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await News.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unable to delete news" });
  }
};

export const getNewsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const news = await News.findByPk(id);
    if (!news) {
      res.status(404).json({ error: "News not found" });
      return;
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch news" });
  }
}

export const getNewsByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const news = await News.findOne({ where: { name } });
    if (!news) {
      res.status(404).json({ error: "News not found" });
      return;
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch news" });
  }
}

export const getNewsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const news = await News.findOne({
      where: { category },
      order: [['date', 'DESC']]
    });
    if (!news) {
      res.status(404).json({ error: "News not found" });
      return;
    }
    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching news:", error); 
    res.status(500).json({ error });
  }
}