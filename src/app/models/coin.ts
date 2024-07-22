import { Schema, model, models } from "mongoose";

const CoinSchema = new Schema({
  name: {
    type: String,
  },
  symbol: {
    type: String,
  },
  rate: {
    type: String,
  },
  volume: {
    type: String,
  },
  cap: {
    type: String,
  },
  liquidity: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const CoinDataModel = models.Coins || model("Coins", CoinSchema);

export default CoinDataModel;
