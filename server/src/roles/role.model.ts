import * as mongoose from "mongoose";
import Role from "./role.interface";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    required: true,
  },
});

const roleModel = mongoose.model<Role & mongoose.Document>("Role", roleSchema);

export default roleModel;
