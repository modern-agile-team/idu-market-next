import React from "react";
import BoardBanner from "../../components/Board/BoardBanner";
import Inquiry from "../../components/Service/Inquiry";
import Head from "next/head";

const InqueryReceivePage = () => {
  return (
    <>
      <Head>
        <title>IUAM | 문의 사항</title>
      </Head>
      <BoardBanner title="Service" desc="inquiry" />
      <section className="service-inquiry" id="service-inquiry">
        <div className="container">
          <Inquiry />
        </div>
      </section>
    </>
  );
};

export default InqueryReceivePage;
