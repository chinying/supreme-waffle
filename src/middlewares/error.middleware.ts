import { NextFunction, Request, Response } from 'express'

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
  console.error(err)
  return res.status(500).json({ message: 'Something went wrong. Please contact admin@example.com' })
}

export const asyncErrorWrapper = <P, ResBody, ReqBody, ReqQuery>(
  routeHandler: (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) => {
  return (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction): void => {
    routeHandler(req, res, next).catch(next)
  }
}

export const ErrorMiddleware = { errorHandler, asyncErrorWrapper }
