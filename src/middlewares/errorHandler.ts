import type { ErrorRequestHandler } from "express";
/// ตรวจจับ error ที่ส่งมาจาก mongodb ว่า email ซ้ำกัน
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.code === 11000) {
    return res.status(409).json({
      error: { message: "Email already in use" },
    });
  }
  const status = err.statusCode || 500;

  if (err.name === "CastError") {
    return res.status(400).json({
      error: { message: "Invalid ID format" },
    });
  }

  res.status(status).json({
    error: { message: err.message || "Internal server error" },
  });
};
