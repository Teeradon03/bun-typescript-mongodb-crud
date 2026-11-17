import type { Request, Response } from "express";
import * as postService from "../services/post.service";

export const create = async (req: Request, res: Response) => {
  const post = await postService.createPost(req.body, req.user!);
  res.status(201).json({ data: post });
};

export const getAll = async (_req: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  res.status(200).json({ data: posts });
};

// ถ้ารับ req.params.id เฉยๆ typescipt จะมองว่าเป็น string | string[]
// req.params.id จะมี type เป็น string แท้ ๆ ทันที
// แก้โดยการใส่ generic <{ id: string }> ให้กับ Request
export const getById = async (req: Request<{ id: string }>, res: Response) => {
  //   console.log("req.params.id", req.params.id);
  const post = await postService.getPostById(req.params.id!);
  res.status(200).json({ data: post });
};

export const update = async (req: Request<{ id: string }>, res: Response) => {
  const post = await postService.updatePost(
    req.params.id!,
    req.body,
    req.user!,
  );
  res.status(200).json({ data: post });
};

// 204 No Content: ลบสำเร็จ ไม่ต้องส่ง body กลับ
export const remove = async (req: Request<{ id: string }>, res: Response) => {
  await postService.deletePost(req.params.id!, req.user!);
  res.status(204).send();
};
