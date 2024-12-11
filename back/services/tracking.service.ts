import { Item } from "../models/item/item.model";

export async function getTrackingCounter(prefix: string): Promise<number> {
  const result = await Item.findAll({
    where: {
		trackingCode: {
        $like: `${prefix}-%`,
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
  prefix: string
): Promise<number> {
  const currentCounter = await getTrackingCounter(prefix);
  return currentCounter + 1;
}
