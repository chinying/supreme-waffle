// This file is the main server app
// Routes are registered here

// Register module aliases, has to be run in the main file, before any code
// Run in app.js because server.js might not be used in a test suite
require('module-alias/register')

// Express
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
// Middlewares to log requests/responses
import { ErrorMiddleware, HealthcheckMiddleware } from '../middlewares'
import apiV1Routes from '../routes'

// Celebrate/Joi Validation
import { isCelebrateError } from 'celebrate'
const expressApp = ({ app }: { app: express.Application }): void => {
  // Take the leftmost entry in X-Forwarded-* header to get user's IP address
  // since the server is sitting behind CloudFlare's proxy and AWS loadbalancer
  // https://expressjs.com/en/guide/behind-proxies.html
  app.use(morgan('combined'))
  app.set('trust proxy', true)

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  // Middleware to respond to health checks
  app.use('/ping', HealthcheckMiddleware.ping)

  // Application Routes
  app.use('/api', apiV1Routes)

  // Error handlers
  // Attach error handler for celebrate validation
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
      const allMessages: string[] = []
      err.details.forEach((value) => {
        allMessages.push(value.message)
      })
      res.status(422).json({ message: allMessages.join('\n') })
    } else {
      next(err)
    }
  })

  // Attach http error handler
  app.use(ErrorMiddleware.errorHandler)
}
// Export app
export default expressApp
