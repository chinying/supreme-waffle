import { NextFunction, Request, Response } from 'express'
/**
 * Healthcheck endpoint that connects to the db
 * @param _req
 * @param res
 * @param next
 */
const ping = async (_req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

export const HealthcheckMiddleware = { ping }
