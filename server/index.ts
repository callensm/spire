require('dotenv').config()
import * as next from 'next'
import * as mongoose from 'mongoose'
import { useStaticRendering } from 'mobx-react'
import server from './server'

mongoose.connect('mongodb://localhost/spire')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = app.getRequestHandler()
useStaticRendering(true)

app
  .prepare()
  .then(() => {
    // Route unhandled paths to React app routes
    server.get('*', (req, res) => {
      handler(req, res)
    })

    server.listen(server.get('port'), () => console.log(`Listening on :${server.get('port')}`))
  })
  .catch(console.error)
