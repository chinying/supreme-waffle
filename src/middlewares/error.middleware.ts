import { NextFunction, Request, Response } from 'express'

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
  console.error(err)
  return res.status(500).json({ message: 'Something went wrong. Please contact admin@example.com' })
}

export const ErrorMiddleware = { errorHandler }
