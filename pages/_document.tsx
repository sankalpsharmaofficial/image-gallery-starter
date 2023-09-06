import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="See Sankalp Sharma photography."
          />
          <meta property="og:site_name" content="https://sankalpsharma-gallery.vercel.app/" />
          <meta
            property="og:description"
            content="See Sankalp Sharma photography."
          />
          <meta property="og:title" content="Sankalp Sharma Photography" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Sankalp Sharma Photography" />
          <meta
            name="twitter:description"
            content="See Sankalp Sharma photography."
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
