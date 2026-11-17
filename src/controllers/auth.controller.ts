import type { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  res.status(201).json({ data: user });
};

export const login = async (req: Request, res: Response) => {
  const user = await authService.login(req.body);
  res.status(200).json({ data: user });
};

export const getMe = async (req: Request, res: Response) => {
  const user = await authService.getMe(req.user!.id);
  res.status(200).json({ data: user });
};
