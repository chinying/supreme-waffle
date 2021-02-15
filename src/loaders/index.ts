import { Application } from 'express'
import expressLoader from './express.loader'

const loaders = ({ app }: { app: Application }): void => {
  expressLoader({ app })
}

export { loaders }
