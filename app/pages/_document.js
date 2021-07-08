import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Jua&family=Montserrat&family=Thasadith&display=swap"
            rel="stylesheet"
          />
	  <title>인덕대 중고마켓</title>

          <meta
            name="description"
            content="인덕대학교 학생들을 위한 중고 마켓 서비스(IUAM)"
          />
          <meta
            name="keywords"
            content="인덕대, 인덕대학교, 중고마켓, IUAM, 장터, 마켓, 중고, IDU, IDU마켓, 인덕, 대학생, 대학교, 시장, 거래, 플랫폼, 웹사이트, 웹, 앱, 우아한애자일, 우애, idu used article market, market, 자유게시판, 공지게시판, iuam"
          />
	  <meta 
	    name="robots" 
	    content="index,follow" 
	  />

	  {/* 웹 사이트 등록 (구글, 네이버) */}  
	  <meta 
	    name="google-site-verification" 
	    content="s91PxIl6swA8Z8e2BGrervqXzYEHitvNaVVN-Ha7MEI" 
	  />
	  <meta 
	    name="naver-site-verification" 
	    content="2208888c0b425832d784638a8c6fe9a65905b29a" 
	  />


          {/* 페이스북 */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="IUAM(Idu Used Articles Market)" />
          <meta
            property="og:description"
            content="인덕대학교 학생들을 위한 중고 마켓 서비스(IUAM)"
          />
          <meta
            property="og:image"
            content="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/favicon.png"
          />
          <meta property="og:url" content="https://idu-market.shop/" />

          {/* 트위터 */}
          <meta property="twitter:card" content="summary" />
          <meta
            property="twitter:title"
            content="IUAM(Idu Used Articles Market)"
          />
          <meta property="twitter:url" content="https://idu-market.shop/" />
          <meta
            property="twitter:description"
            content="인덕대학교 학생들을 위한 중고 마켓 서비스(IUAM)"
          />
          <meta
            property="twitter:image"
            content="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/favicon.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
