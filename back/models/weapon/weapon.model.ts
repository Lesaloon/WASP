import { Schema } from "mongoose";
import { Item } from "../item/item.model";

enum Category {
  Pistol = "Pistol",
  Rifle = "Rifle",
  Shotgun = "Shotgun",
  // ...other categories
}

enum ActionType {
  SemiAutomatic = "Semi-Automatic",
  BoltAction = "Bolt-Action",
  // ...other action types
}

const weaponSchema = new Schema({
  category: {
    type: String,
    enum: Object.values(Category),
    required: true,
  },
  subcategory: {
    type: String,
    required: false,
  },
  model: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
    default: "NONE",
  },
  caliberGauge: {
    type: String,
    required: true,
  },
  actionType: {
    type: String,
    enum: Object.values(ActionType),
    required: true,
  },
  countryOfOrigin: {
    type: String,
    required: true,
    default: "France",
  },
});

export const Weapon = Item.discriminator("Weapon", weaponSchema);
