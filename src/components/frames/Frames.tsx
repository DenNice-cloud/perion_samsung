import React from "react";
import { currentText } from "../constants/constant";

export const Frames = ({
  handleClickPage,
  setCurrentPage,
  currentPage,
  frameRef,
  descriptionRef,
  setIsAutoPlay,
  animateTransition,
}) => {
  const handleNext = () => {
    setIsAutoPlay(false);
    const nextPage = currentPage >= 5 ? 1 : currentPage + 1;
    setCurrentPage(nextPage);
    animateTransition(nextPage);
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    const prevPage = currentPage <= 1 ? 5 : currentPage - 1;
    setCurrentPage(prevPage);
    animateTransition(prevPage);
  };

  return (
    <div className="frame-1">
      <div>
        <img
          ref={frameRef}
          className="image-right"
          src={`/Material/frame_${currentPage + 1}.png`}
          alt={`frame ${currentPage + 1}`}
        />
      </div>

      <img
        className="logo samsung_logo"
        src="/Material/Samsung.png"
        alt="samsung logo"
      />

      <img
        className="logo bespoke_jet"
        src="/Material/Bespoke_JetTM.png"
        alt="bespoke jet logo"
      />

      <img
        className="main_text main_text-frames"
        src="/Material/main_text.png"
        alt="See why the Bespoke is so good"
      />

      <div className="description_page">
        <p
          className="description"
          ref={descriptionRef}
        >
          {currentText[currentPage - 1]}

          <button
            className="readmore_Button"
            onClick={handleClickPage}
          >
            Read more...
          </button>
        </p>

        <div className="buttons_NextPrev">
          <button
            className="button_prev"
            onClick={handlePrev}
          >
            <img
              className="my-icon"
              src="/Material/SVG/r.svg"
              alt="previous arrow button"
            />
          </button>

          <div>{`${currentPage}/5`}</div>

          <button
            className="button_next"
            onClick={handleNext}
          >
            <img
              className="my-icon"
              src="/Material/SVG/l.svg"
              alt="next arrow button"
            />
          </button>
        </div>
      </div>

      <button
        className="shop_now_button"
        onClick={handleClickPage}
      >
        SHOP NOW
      </button>
    </div>
  );
};

export default Frames;
