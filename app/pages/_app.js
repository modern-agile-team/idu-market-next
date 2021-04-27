import "../styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import loginCheck from "../components/auth/loginCheck";

import "../scss/main.scss";
import "suneditor/dist/css/suneditor.min.css";

loginCheck();

function MyApp({ Component, pageProps }) {
  // if (process.env.NODE_ENV === "production") console.log("production");
  // else if (process.env.NODE_ENV === "development") console.log("development");
  // else console.log("other");

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
