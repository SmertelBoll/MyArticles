import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

export default mongoose.model("Image", ImageSchema);
