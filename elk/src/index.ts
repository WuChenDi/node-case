import express from "express";
import log4js from "log4js";
import * as homeController from "./controllers/home";

const app = express();

const PORT: number = app.get("port") || 3000;
const ENV: string = app.get("env");

log4js.configure({
  appenders: {
    console: { type: "console" },
    // file: { type: "file", filename: "all-the-logs.log" },
    // https://github.com/Aigent/log4js-logstash-tcp
    // 通过 tcp 方式输出到 logstash
    elk_learn: {
      type: "log4js-logstash-tcp",
      host: "127.0.0.1",
      port: 5000
    }
  },
  categories: {
    default: { appenders: ["elk_learn"], level: "debug" }
  }
});

const logger = log4js.getLogger("default");
logger.level = "debug";

app.get("/index", homeController.index);

const server = app.listen(PORT, () => {
  logger.info("App is running at http://localhost:%d in %s mode", PORT, ENV);
  logger.info("Press CTRL-C to stop\n");
});

export default server;
