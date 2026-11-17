import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

interface JwtPayload {
  sub: string;
  role: "user" | "admin";
}

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  // 1. ดึง token จาก header "Authorization: Bearer <token>"
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new AppError(401, "Missing or invalid token");
  }

  const token = header.split(" ")[1]; // ตัดคำว่า "Bearer " ออก เอาแค่ตัว token

  try {
    // 2. ตรวจลายเซ็นและวันหมดอายุด้วย JWT_SECRET
    const payload = jwt.verify(token!, env.JWT_SECRET) as JwtPayload;

    // 3. แปะข้อมูล user ลงบน req (ถ้าไม่มี express.d.ts บรรทัดนี้จะแดง!)
    req.user = {
      id: payload.sub,
      role: payload.role,
    };

    next(); // ผ่านด่านได้ ไป controller ต่อ
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }
};
