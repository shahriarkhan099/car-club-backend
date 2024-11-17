import { Request, Response } from "express";
import Event from "../models/Event";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch events" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Event.update(req.body, { where: { id } });
    const updatedEvent = await Event.findByPk(id);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: "Unable to update event" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Event.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unable to delete event" });
  }
};

