import { Schema, model, models } from "mongoose";

const SelectedCoinSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
  },
  { timestamps: true }
);

SelectedCoinSchema.index({});
const selectedCoin =
  models.SelectCoin || model("SelectCoin", SelectedCoinSchema);

export default selectedCoin;
