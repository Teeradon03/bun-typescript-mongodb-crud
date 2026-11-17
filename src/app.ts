import express from "express";
import routes from "./routes/auth.route";
import { errorHandler } from "./middlewares/errorHandler";
import postRoutes from "./routes/post.route"; // ← import route ของ post

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", routes);
app.use("/api/posts", postRoutes); // ← เพิ่ม route ของ post
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use(errorHandler);

export default app; //
