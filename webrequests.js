const http = require('http')
const winston = require('winston')
const ecsFormat = require('@elastic/ecs-winston-format')

const logger = winston.createLogger({
  level: 'debug',
  format: ecsFormat({ convertReqRes: true }),
  transports: [
    //new winston.transports.Console(),
    new winston.transports.File({
      //path to log file
      filename: 'logs/log.json',
      level: 'debug'
    })
  ]
})

const server = http.createServer(handler)
server.listen(3001, () => {
  logger.info('listening at http://localhost:3001')
})

function handler (req, res) {
 res.setHeader('Foo', 'Bar')
  res.end('ok')
  logger.info('handled request', { req, res })
}