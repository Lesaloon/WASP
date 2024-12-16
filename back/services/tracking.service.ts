import { Item } from "../models/item/item.model";
import { sql } from "@sequelize/core";
import { Model, ModelStatic, Op } from "sequelize";

export async function getTrackingCounter(
  prefix: string,
  model: ModelStatic<Model>
): Promise<number> {
  const result = await model.findAll({
    where: {
      trackingCode: {
        [Op.like]: prefix + "%",
      },
    },
  });
  if (result.length === 0) {
    return 0;
  }
  const lastTrackingNumber = result[0].get().trackingCode;
  const counter = parseInt(lastTrackingNumber.split("-")[1], 10);
  return counter;
}

export async function incrementTrackingCounter(
  prefix: string,
  model: ModelStatic<Model>
): Promise<number> {
  const currentCounter = await getTrackingCounter(prefix, model);
  return currentCounter + 1;
}