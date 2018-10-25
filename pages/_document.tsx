import * as React from 'react'
import Document, { Head, Main, NextScript, DocumentProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

interface ISpireDocumentProps extends DocumentProps {
  styleTags: any[]
}

class SpireDocument extends Document<ISpireDocumentProps> {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Mono|Nunito" />
          <style>
            {`
            #nprogress .bar {
              background: #ff876c;
            }
            `}
          </style>
          {this.props.styleTags}
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
