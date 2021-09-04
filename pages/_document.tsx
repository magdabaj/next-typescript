import Document, { Head, Html, NextScript, Main } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core'
import React from 'react'
import theme from '../theme'
import { ServerStyleSheet } from '../../../../.config/JetBrains/WebStorm2021.2/javascript/extLibs/codota-types/styled-components/5.1.14/@types/styled-components'

export default class MyDocument extends Document {
  public muiTheme = theme(true)
  render () {
    return (
      <Html lang={"en"}>
        <Head>
          <meta name="theme-color" content={this.muiTheme.palette.primary.main} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,500,700&display=swap" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,500,700&display=swap"
          />
          <title>Next js Chatbot</title>
        </Head>
        <body>
        <Main/>
        <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage
  const sheet = new ServerStyleSheet()

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
      sheet.getStyleElement()
    ]
  }
}