import {
  getTrackingCounter,
  incrementTrackingCounter,
} from "../services/tracking.service";

export async function generateTrackingNumber(
  itemType: string
): Promise<string> {
  let prefix = "";

  switch (itemType.toLowerCase()) {
    case "weapon":
      prefix = "WPN";
      break;
    case "part":
      prefix = "PRT";
      break;
    case "accessory":
      prefix = "ACC";
      break;
    case "magazine":
      prefix = "MAG";
      break;
    // ...other item types
    default:
      prefix = "GEN";
      break;
  }

  let counter = await getTrackingCounter(prefix);
  counter = await incrementTrackingCounter(prefix);

  const counterStr = counter.toString().padStart(4, "0").toString(); // Ensure the counter is always 4 digits

  return `${prefix}-${counterStr}`;
}
