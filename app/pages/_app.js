import "../static/styles/globals.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import loginCheck from "../components/Auth/loginCheck";
import { useRouter } from "next/router";
import { API_KEY } from "../Data/API_KEY";
import axios from "axios";
import * as gtag from "../lib/gtag";

import "../scss/main.scss";
import "react-quill/dist/quill.snow.css";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers.common["api-key"] = API_KEY;

loginCheck();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const agent = window.navigator.userAgent.toLowerCase();
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    if (agent.indexOf("chrome") === -1) {
      alert(
        "IDU 마켓은 Chrome 브라우저에 최적화된 사이트입니다. Chrome 브라우저 사용을 권장합니다."
      );
    }

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
