# Bun TypeScript MongoDB CRUD

This project develop by Me (aka ท่านอ๋อง ) with antigravity hydrogen model.

I just wanna practice my skills, Nothing more.

REST API สำหรับระบบสมาชิก (JWT Authentication) และจัดการโพสต์ (CRUD)
สร้างด้วย Bun + Express + TypeScript + MongoDB รันบน Docker ได้

## Tech Stack

- **Runtime:** [Bun](https://bun.sh)
- **Framework:** Express 5
- **Language:** TypeScript
- **Database:** MongoDB 7 + Mongoose
- **Validation:** Zod
- **Auth:** JWT (jsonwebtoken) + `Bun.password` สำหรับ hash รหัสผ่าน
- **Container:** Docker / Docker Compose

## Getting Started

### สิ่งที่ต้องมี

- [Bun](https://bun.sh) v1.x
- [Docker](https://www.docker.com/) + Docker Compose

### 1. Clone และติดตั้ง dependencies

```bash
git clone <repo-url>
cd bun-typescript-mongodb-crud
bun install
```

### 2. รันโปรเจกต์

** แบบที่ 1: รัน API บนเครื่อง **

```bash
docker compose up -d    # เปิด MongoDB + Mongo Express
bun run dev             # รัน API แบบ watch mode
```

** แบบที่ 2: รันทั้งหมดใน Docker **

```bash
docker compose --profile app up -d --build
```

| Service       | URL                   |
| ------------- | --------------------- |
| API           | http://localhost:3000 |
| Mongo Express | http://localhost:8081 |

## Scripts

| คำสั่ง              | ทำอะไร                       |
| ------------------- | ---------------------------- |
| `bun run dev`       | รัน API แบบ auto-reload      |
| `bun run start`     | รัน API แบบปกติ (production) |
| `bun run typecheck` | ตรวจ TypeScript type         |

## Project Structure

```
src/
├── index.ts          # เชื่อมต่อ DB แล้วสั่ง listen
├── app.ts            # ประกอบ Express app, routes, errorHandler
├── config/           # อ่านและตรวจ .env ด้วย zod
├── models/           # Mongoose schema (User, Post)
├── middlewares/      # auth (JWT), validate (zod), errorHandler
├── routes/           # กำหนด path ของ API
├── controllers/      # รับ req / ส่ง res
├── services/         # business logic + คุยกับ database
├── types/            # ขยาย type ของ Express (req.user)
└── utils/            # AppError
```
