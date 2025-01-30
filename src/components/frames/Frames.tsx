import React from "react";
import { currentText } from "../constants/constant";

interface FramesProps {
  handleClickPage: () => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  frameRef: React.RefObject<HTMLImageElement  | null>;
  descriptionRef: React.RefObject<HTMLParagraphElement | null>;
  setIsAutoPlay: (isAutoPlay: boolean) => void;
  animateTransition: (newPage: number) => void;
}


export const Frames: React.FC<FramesProps> = ({
  handleClickPage,
  currentPage,
  setCurrentPage,
  frameRef,
  descriptionRef,
  setIsAutoPlay,
  animateTransition,
}) => {
  const handleNext = () => {
    setIsAutoPlay(false);
    const nextPage: number = currentPage >= 5 ? 1 : currentPage + 1;
    setCurrentPage(nextPage);
    animateTransition(nextPage);
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    const prevPage: number = currentPage <= 1 ? 5 : currentPage - 1;
    setCurrentPage(prevPage);
    animateTransition(prevPage);
  };

  return (
    <div className="frame-1">
      <div>
        <img
          ref={frameRef}
          className="image-right"
          src={`${process.env.PUBLIC_URL}/material/frame_${currentPage + 1}.png`}
          alt={`frame ${currentPage + 1}`}
        />
      </div>

      <img
        className="logo samsung_logo"
        src={`${process.env.PUBLIC_URL}/material/Samsung.png`}
        alt="samsung logo"
      />

      <img
        className="logo bespoke_jet"
        src={`${process.env.PUBLIC_URL}/material/Bespoke_JetTM.png`}
        alt="bespoke jet logo"
      />

      <img
        className="main_text main_text-frames"
        src={`${process.env.PUBLIC_URL}/material/main_text.png`}
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
              src={`${process.env.PUBLIC_URL}/material/SVG/r.svg`}
              alt="previous arrow button"
            />
          </button>

          <div>{`${currentPage}/5`}</div>

          <button
            className="button_next"
            onClick={handleNext}
          >
            <img
              src={`${process.env.PUBLIC_URL}/material/SVG/l.svg`}
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
