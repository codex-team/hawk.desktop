/**
 * Logger can save log to file in appData/logs dir
 *
 * @usage enable logger
 * global.logger = require('./utils/logger');
 *
 * @example logger.log('my log %s', variable);
 * @example logger.debug('my log %s', variable);
 * @example logger.info('my log');
 * @example logger.warn('my log');
 * @example logger.error('my log');
 */
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { app } = require('electron');
const appData = require('./appData');

/**
 * Instance of class for singleton
 */
let _instance;

/**
 * Logger wrapper
 */
class Logger {
  /**
   * Prepare logger
   */
  constructor() {
    /**
     * Logs will be stored in the app-data/logs
     * @type {string}
     */
    this.logsDirPath = path.join(appData.logsDir);

    console.log(this.logsDirPath);

    if (!fs.existsSync(this.logsDirPath)) {
      fs.mkdirSync(this.logsDirPath, { recursive: true });
    }
  }

  /**
   * @returns {{warn: any, debug: any, log: any, error: any, info: any}}
   */
  getLogger() {
    const logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'debug',
      format: winston.format.combine(
        winston.format.errors({ stack: true }), // <-- use errors format
        winston.format.timestamp({
          format: 'HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} [${info.level}] ${info.message}` + (info.splat !== undefined ? `${info.splat}` : ' ') + (info.stack !== undefined ? `\n${info.stack}` : ''))
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          dirname: this.logsDirPath,
          filename: '%DATE%.log'
        })
      ]
    });

    return {
      log: logger.debug.bind(logger),
      debug: logger.debug.bind(logger),
      info: logger.info.bind(logger),
      warn: logger.warn.bind(logger),
      error: logger.error.bind(logger)
    };
  }

  /**
   * @returns {Logger}
   */
  static getInstance() {
    if (!_instance) {
      _instance = new Logger();
    }

    return _instance;
  }
}

module.exports = Logger.getInstance();
