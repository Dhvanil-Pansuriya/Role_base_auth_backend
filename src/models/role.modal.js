// src/models/permission.model.js
import mongoose, { Schema, model } from "mongoose";

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  rolePermissions: [{
    type: String,
    enum: ["admin", "staff", "user"],
    required: true,
  }],
}, {
  timestamps: true,
});

const Role = model("Role", RoleSchema);
export default Role; z