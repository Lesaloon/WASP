import * as Log4js from "log4js";
import { join } from "path";
const logConfig = {
  appenders: {
	console: {
	  type: "console",
	},
	file: {
	  type: "file",
	  filename: join(process.cwd(), "logs", "log.log"),
	  maxLogSize: 10485760, // 10MB
	  backups: 3, // 3 backups locate
	},
  },
  categories: {
	default: {
	  appenders: ["console", "file"],
	  level: "trace",
	},
  },
};

export default class Log {
	private static logger : Log4js.Logger;
	constructor() {
		if (Log.logger === undefined) {
			Log4js.configure(logConfig);
			Log.logger = Log4js.getLogger();
		}
	}

	getLogger() {
		return Log.logger;
	}
}