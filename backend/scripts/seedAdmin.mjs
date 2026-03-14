import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import { User } from "../models/userSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, "..", "config", "config.env") });

const email = "mi@gmail.com";
const password = "1130200007";

const adminData = {
  firstName: "Admin",
  lastName: "User",
  email,
  phone: "03000000000",
  nic: "1234567890",
  dob: new Date("1990-01-01"),
  gender: "Male",
  password,
  role: "Admin",
};

const run = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI missing. Check backend/config/config.env");
  }

  await mongoose.connect(process.env.MONGO_URI, {
    dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
  });

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    await mongoose.disconnect();
    return;
  }

  await User.create(adminData);
  console.log(`Admin created: ${email}`);
  console.log(`Password: ${password}`);
  await mongoose.disconnect();
};

run().catch(async (err) => {
  console.error(err?.message ?? err);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exitCode = 1;
});

