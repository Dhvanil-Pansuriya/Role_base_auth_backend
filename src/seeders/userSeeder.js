// src/seeders/userSeeder.js
import fs from "fs";
import { parse } from "csv-parse";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { hash } from "bcryptjs";
import connectDB from "../config/db.js";

const seedUsers = async () => {
  await connectDB();

  const csvData = [];
  fs.createReadStream("backend/users.csv")
    .pipe(parse({ columns: true, trim: true }))
    .on("data", (row) => {
      csvData.push(row);
    })
    .on("end", async () => {
      try {
        for (const row of csvData) {
          const hashedPassword = await hash("password123", 10); // Replace with real password hashing
          const user = new User({
            name: row.name,
            email: row.email,
            password: hashedPassword,
            gender: row.gender,
            role: row.role,
            permissions: JSON.parse(row.permissions),
          });
          await user.save();
          console.log(`Seeded user: ${row.name}`);
        }
        console.log("User seeding complete!");
        mongoose.connection.close();
      } catch (err) {
        console.error("Error seeding users:", err);
        mongoose.connection.close();
      }
    })
    .on("error", (err) => {
      console.error("Error parsing CSV:", err);
    });
};

// seedUsers();

export default seedUsers;
