import React from "react";

interface FrameFirstProps {
  handleClickPage: () => void;
  mainTextRef: React.RefObject<HTMLDivElement | null>;
  samsungLogoRef: React.RefObject<HTMLDivElement | null>;
  mainFrameRef: React.RefObject<HTMLImageElement | null>;
}

export const FrameFirst: React.FC<FrameFirstProps> = ({
  handleClickPage,
  mainTextRef,
  samsungLogoRef,
  mainFrameRef,
}) => {
  return (
    <div className="frame-1">
      <div ref={samsungLogoRef}>
        <img
          className="logo samsung_logo"
          src={`${process.env.PUBLIC_URL}/material/Samsung.png`}
          alt="samsung logo"
        />
      </div>

      <img
        className="logo bespoke_jet"
        src={`${process.env.PUBLIC_URL}/material/Bespoke_JetTM.png`}
        alt="bespoke logo"
      />

      <div ref={mainTextRef}>
        <img
          className="main_text"
          src={`${process.env.PUBLIC_URL}/material/main_text.png`}
          alt="See why the Bespoke is so good"
        />
      </div>

      <button
        className="shop_now_button"
        onClick={handleClickPage}
      >
        SHOP NOW
      </button>

      <div className="flex">
        <img
          ref={mainFrameRef}
          className="image-frame_1"
          src={`${process.env.PUBLIC_URL}/material/frame_1.png`}
          alt="first frame"
        />
      </div>
    </div>
  );
};

export default FrameFirst;
