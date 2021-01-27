import * as mongoose from "mongoose";
import Permission from "./permission.interface";

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const permissionModel = mongoose.model<Permission & mongoose.Document>(
  "Permission",
  permissionSchema
);

export default permissionModel;
