require('dotenv').config()
import * as express from 'express'
import * as next from 'next'
import * as helmet from 'helmet'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as routes from './routes'

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = app.getRequestHandler()
app.prepare().then(() => {
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

  server.get('*', (req, res) => {
    handler(req, res)
  })

  server.listen(server.get('port'), () => console.log(`Listening on :${server.get('port')}`))
})
