import logger from 'loglevel'
import { connectDB } from './database'
import { startServer } from './server'

logger.setLevel('info')
connectDB()
startServer()
