import { Schema } from "mongoose";
import { Item } from "../item/item.model";

const accessorySchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  associatedWeapon: {
    type: Schema.Types.ObjectId,
    ref: "Weapon",
    required: false,
  },
});

export const Accessory = Item.discriminator("Accessory", accessorySchema);
