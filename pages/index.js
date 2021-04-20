import Head from "next/head";
import Header from "../components/Header/Header";
import MainBanner from "../components/HomePage/MainBanner";
import Function from "../components/HomePage/Function";
import Introduce from "../components/HomePage/Introduce";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <MainBanner></MainBanner>
      <Function></Function>
      <Introduce></Introduce>
    </div>
  );
}
