# 1. ใช้ image ของ Bun (รองรับทั้ง PC และ Raspberry Pi 5 ARM64)
FROM oven/bun:1-alpine

# 2. โฟลเดอร์ทำงานข้างใน container
WORKDIR /app

# 3. ก๊อปเฉพาะไฟล์รายการ package มาลงก่อน (ช่วยจำ cache ไม่ต้องโหลดใหม่ทุกครั้งที่แก้โค้ด)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# 4. ก๊อปโค้ดเข้า container
COPY src ./src
COPY tsconfig.json ./

# 5. เปิด port (documentation)
EXPOSE 3000

# 6. รันแอป (เรียก script "start": "bun src/index.ts")
CMD ["bun", "run", "start"]