import React from "react";
import BoardBanner from "../../components/Board/BoardBanner";
import Inquiry from "../../components/Service/Inquiry";

const InqueryReceivePage = () => {
  return (
    <>
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
