import { z } from "zod";

// ① กำหนดว่าต้องมี env อะไรบ้าง และแต่ละตัวเป็น type อะไร
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("1d"),
});

// ② ตรวจค่าจาก process.env
const result = envSchema.safeParse(process.env);

// ③ ถ้าไม่ผ่าน → แสดงว่าผิดตรงไหน แล้วหยุดโปรแกรม
if (!result.success) {
  console.error("❌ Invalid environment variables:");
  for (const issue of result.error.issues) {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

// ④ export ค่าที่ตรวจแล้ว (มี type ครบ)
export const env = result.data;

// ⑤ (ทางเลือก) export type ไว้ใช้ที่อื่น
export type Env = z.infer<typeof envSchema>;
