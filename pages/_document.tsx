import * as React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

class SpireDocument extends Document<{ styleTags: any }> {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Mono|Nunito" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default SpireDocument
