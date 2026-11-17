import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Invalid email").toLowerCase().trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

// ดึง Type ไปใช้ใน Service ได้เลย
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

const validate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: {
          message: "Validation failed",
          details: result.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        },
      });
    }
    req.body = result.data;
    next();
  };
export const validateRegister = validate(registerSchema);
export const validateLogin = validate(loginSchema);

export const createPostSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().min(1, "Content is required"),
});

// ทำให้ทุก field เป็น optional เอาไว้แก้ไข post แก้ content title ได้บาง field
export const updatePostSchema = createPostSchema.partial();

/// export type เอาไปไว้ใช้ข้างนอกได้ เช่นใน service / controller
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;

export const validateCreatePost = validate(createPostSchema);
export const validateUpdatePost = validate(updatePostSchema);
