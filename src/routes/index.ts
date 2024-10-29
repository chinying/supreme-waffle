import { Request, Response, Router } from 'express'

const router = Router()

router.post('/info', (req: Request, res: Response) => {
  console.log({ timestamp: new Date(), message: JSON.stringify(req.body) })
  res.sendStatus(200)
})

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'ok' })
})

export default router
