require('dotenv').config()

import 'source-map-support/register'
import express, { Request, Response } from 'express'

import { loaders } from './loaders'

const port = Number(process.env.PORT) || 4000
const app: express.Application = express()

const start = async (): Promise<void> => {
  await loaders({ app })
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({ message: 'ok' })
  })
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Listening on port ${port}!`))
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
