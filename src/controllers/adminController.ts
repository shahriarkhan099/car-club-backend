import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin"; 
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const createAdmin: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword });
    res.status(201).json({ id: admin.id, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: "Failed to create admin! Please try different username" });
  }
};

export const loginAdmin: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(403).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: "72h" });
    res.json({ token });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
    return;
  }
};

export const deleteAdmin: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Admin.count();
    if (count === 1) {
      res.status(403).json({ error: "Cannot delete the only admin" });
      return;
    }

    await Admin.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete admin" });
  }
};

export const getAllAdmins: RequestHandler = async (_req, res) => {
  try {
    const admins = await Admin.findAll({ attributes: ["id", "username"] });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admins" });
  }
};

export const getAdminCount: RequestHandler = async (_req, res) => {
  try {
    const count = await Admin.count();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin count" });
  }
};
