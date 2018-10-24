require('dotenv').config()
import * as next from 'next'
import server from './server'

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = app.getRequestHandler()

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
