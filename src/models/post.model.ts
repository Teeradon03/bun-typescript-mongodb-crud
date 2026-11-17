import { Schema, model, type Types } from "mongoose";

// ประกาศ interface ของ post ไม่ต้องใส่ _id เพราะ Mongoose เติมให้เอง
export interface IPost {
  title: string;
  content: string;
  author: Types.ObjectId; // เก็บ _id ของ User ที่สร้างโพสต์
  createdAt: Date;
  updatedAt: Date;
}

/// schema ของ post content
const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true, // เติม createdAt / updatedAt ให้อัตโนมัติ
    versionKey: false, // ไม่ต้องมี __v
  },
);

// export ออกไปใช้ใน controller / service
export const Post = model<IPost>("Post", postSchema);
