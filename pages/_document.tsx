import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="Explore Sankalp Sharma's photography — a curated collection of life's most beautiful moments captured through the lens."
          />
          <meta
            property="og:site_name"
            content="Sankalp Sharma Photography"
          />
          <meta
            property="og:description"
            content="Explore Sankalp Sharma's photography — a curated collection of life's most beautiful moments captured through the lens."
          />
          <meta
            property="og:title"
            content="Sankalp Sharma Photography"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Sankalp Sharma Photography"
          />
          <meta
            name="twitter:description"
            content="Explore Sankalp Sharma's photography — a curated collection of life's most beautiful moments captured through the lens."
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
