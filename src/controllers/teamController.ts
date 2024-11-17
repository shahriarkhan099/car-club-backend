import { Request, Response } from "express";
import TeamMember from "../models/TeamMember";

export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const teamMember = await TeamMember.create(req.body);
    res.status(201).json(teamMember);
  } catch (error) {
    res.status(500).json({ error: "Unable to create team member" });
  }
};

export const getAllTeamMembers = async (_req: Request, res: Response) => {
  try {
    const teamMembers = await TeamMember.findAll();
    res.status(200).json(teamMembers);
  } catch (error) {
    if (!res.headersSent) {
       res.status(500).json({ error: "Unable to fetch team members" });
    }
  }
};

export const updateTeamMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await TeamMember.update(req.body, { where: { id } });
    const updatedTeamMember = await TeamMember.findByPk(id);
    res.status(200).json(updatedTeamMember);
  } catch (error) {
    res.status(500).json({ error: "Unable to update team member" });
  }
};

export const deleteTeamMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await TeamMember.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unable to delete team member" });
  }
};
