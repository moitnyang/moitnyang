import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.API_MAP}&libraries=services,clusterer&autoload=false`}
            strategy="beforeInteractive"
        />
        <Script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=APIKEY&libraries=services"
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
