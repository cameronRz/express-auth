import * as winston from 'winston';

const { combine, timestamp, printf } = winston.format;

const logFormatter = printf(({ message, level, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

export const log = winston.createLogger({
    format: combine(
        timestamp(),
        logFormatter,
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/app.log' }),
    ]
});