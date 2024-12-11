import { Model, ModelStatic } from "sequelize";
import Log from "../config/log.config";
import {
  getTrackingCounter,
  incrementTrackingCounter,
} from "../services/tracking.service";

const logger = new Log().getLogger();

export async function generateTrackingNumber(
  itemType: string, model: ModelStatic<Model>
): Promise<string> {
  logger.info("generateTrackingNumber");
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
  let counter = await incrementTrackingCounter(prefix, model);

  const counterStr = counter.toString().padStart(4, "0").toString(); // Ensure the counter is always 4 digits
  logger.info(`Generated tracking code: ${prefix}-${counterStr}`);
  return `${prefix}-${counterStr}`;
}
