import { Schema, model, type Model } from "mongoose";

//  Interface ของ user ไม่ต้องใส่ _id เพราะ Mongoose เติมให้เอง
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

// method ที่เรียกจาก document ได้ เช่น user.comparePassword()
interface IUserMethods {
  comparePassword(candidate: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

// ② Schema
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true, // สร้าง unique index
      lowercase: true, // แปลงเป็นตัวเล็กก่อนบันทึก
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // query ปกติจะไม่ดึง field นี้มา
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true, // เติม createdAt / updatedAt ให้อัตโนมัติ
    versionKey: false, // ไม่ต้องมี __v
    toJSON: {
      transform(_doc, ret: Record<string, any>) {
        delete ret.password; // กันไม่ให้ password หลุดไปใน response
        return ret;
      },
    },
  },
);

//  Hook: hash password ก่อนบันทึก
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // ถ้าไม่ได้แก้ password ก็ไม่ต้อง hash ซ้ำ
  this.password = await Bun.password.hash(this.password);
});

//  Method: ตรวจรหัสผ่าน
userSchema.method("comparePassword", function (candidate: string) {
  return Bun.password.verify(candidate, this.password);
  // return (this.password = candidate); // Bun.password.verify(candidate, this.password);
});

//  Model
export const User = model<IUser, UserModel>("User", userSchema);
