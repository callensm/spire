import * as express from 'express'
import * as helmet from 'helmet'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as routes from './routes'

const server = express()
server.set('port', process.env.PORT)
server.use(helmet())
server.use(compression())
server.use(cookieParser())
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use('/tag', routes.TagRouter)
server.use('/user', routes.UserRouter)
server.use('/snippet', routes.SnippetRouter)

export default server
