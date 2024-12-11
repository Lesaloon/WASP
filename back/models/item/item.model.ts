import { Schema, model, Document, Model } from "mongoose";
import { generateTrackingNumber } from "../../helpers/tracking.helper";

enum Condition {
  New = "New",
  Used = "Used",
  Refurbished = "Refurbished",
  // ...other conditions
}

enum Status {
  InUse = "In Use",
  Retired = "Retired",
  UnderMaintenance = "Under Maintenance",
  // ...other statuses
}

const options = { discriminatorKey: 'itemType', collection: 'items' };

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  dateAcquired: {
    type: Date,
    required: true,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  condition: {
    type: String,
    enum: Object.values(Condition),
    required: true,
    default: Condition.New,
  },
  status: {
    type: String,
    enum: Object.values(Status),
    required: true,
    default: Status.InUse,
  },
  notes: {
    type: String,
    required: false,
  },
  warranty: {
    type: String,
    required: false,
  },
  trackingCode: {
    type: String,
    required: true,
    unique: true
  },
}, options);

export const Item = model("Item", ItemSchema);
