import * as mongoose from "mongoose";
import Setting from "./setting.interface";

const settingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  isEditable: {
    type: Boolean,
    required: true,
  },
});

const settingModel = mongoose.model<Setting & mongoose.Document>(
  "Setting",
  settingSchema
);

export default settingModel;
