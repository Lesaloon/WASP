import { Schema } from "mongoose";
import { Item } from "../item/item.model";

const partSchema = new Schema({
  associatedWeapon: {
    type: Schema.Types.ObjectId,
    ref: "Weapon",
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  compatibleModels: {
    type: [String],
    required: true,
  },
});

export const Part = Item.discriminator("Part", partSchema);
