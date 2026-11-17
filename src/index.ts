import mongoose from "mongoose";
import app from "./app";
import { env } from "./config/env";

await mongoose.connect(env.MONGO_URI);
console.log("MongoDB connected");

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
