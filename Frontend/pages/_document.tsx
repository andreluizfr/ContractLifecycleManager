import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body style={{marginRight: "0 !important"}}> {/* put it here coz of a problem with layout shift when dropdown is active */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
