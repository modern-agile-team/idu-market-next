import "../styles/globals.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import loginCheck from "../components/Auth/loginCheck";

import "../scss/main.scss";
import "react-quill/dist/quill.snow.css";

loginCheck();

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const agent = window.navigator.userAgent.toLowerCase();

    if (agent.indexOf("msie") !== -1) {
      alert(
        "IDU 마켓은 최신 브라우저에 최적화된 사이트입니다. 최신 브라우저 사용을 권장합니다."
      );
    }
  }, []);

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
