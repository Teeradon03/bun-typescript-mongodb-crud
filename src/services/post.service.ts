import { Post } from "../models/post.model";
import type { CreatePostInput, UpdatePostInput } from "../middlewares/validate";
import { AppError } from "../utils/AppError";

interface CurrentUser {
  id: string;
  role: "user" | "admin";
}

// สร้างโพสต์ใหม่  โดยใช้ข้อมูลจาก request body และ currentUser จาก middleware auth
export const createPost = async (
  data: CreatePostInput,
  currentUser: CurrentUser,
) => {
  const post = await Post.create({ ...data, author: currentUser.id });
  return post;
};

// ดึงโพสต์ทั้งหมดของผู้ใช้
export const getAllPosts = async () => {
  const posts = await Post.find().populate("author", "name email");
  return posts;
};

export const getPostById = async (postId: string) => {
  const post = await Post.findById(postId).populate("author", "name email");
  if (!post) {
    throw new AppError(404, "Post not found");
  }
  return post;
};

export const updatePost = async (
  id: string,
  data: UpdatePostInput,
  user: CurrentUser,
) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError(404, "Post not found");
  }
  // เช็กสิทธิ์: ต้องเป็นเจ้าของโพสต์ หรือเป็น admin เท่านั้น
  if (post.author.toString() !== user.id && user.role !== "admin") {
    throw new AppError(403, "You are not allowed to update this post");
  }
  Object.assign(post, data); // อัปเดตเฉพาะ field ที่ส่งมา
  return post.save();
};

export const deletePost = async (id: string, user: CurrentUser) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError(404, "Post not found");
  }
  if (post.author.toString() !== user.id && user.role !== "admin") {
    throw new AppError(403, "You are not allowed to delete this post");
  }
  await post.deleteOne();
};
