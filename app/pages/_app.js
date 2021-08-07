import "../styles/globals.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import loginCheck from "../components/Auth/loginCheck";
import { API_KEY } from "../Data/API_KEY";
import axios from "axios";

import "../scss/main.scss";
import "react-quill/dist/quill.snow.css";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

loginCheck();

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const agent = window.navigator.userAgent.toLowerCase();

    if (agent.indexOf("chrome") === -1) {
      alert(
        "IDU 마켓은 Chrome 브라우저에 최적화된 사이트입니다. Chrome 브라우저 사용을 권장합니다."
      );
    }
  }, []);

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  axios.defaults.headers.common["api-key"] = API_KEY;

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
