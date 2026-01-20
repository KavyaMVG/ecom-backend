import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    imageUrl: {
      type: String,
      required: true,
      default: "https://picsum.photos/600/400",
    },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.__v;
      },
    },
  },
);

export default mongoose.model("products", productSchema);
