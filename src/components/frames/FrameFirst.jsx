export const FrameFirst = ({
  handleClickPage,
  mainTextRef,
  samsungLogoRef,
}) => {
  return (
    <div className="frame-1">
      <div ref={samsungLogoRef}>
        <img
          className="logo samsung_logo"
          src="/Material/Samsung.png"
          alt="samsung logo"
        />
      </div>

      <img
        className="logo bespoke_jet"
        src="/Material/Bespoke_JetTM.png"
        alt="bespoke logo"
      />

      <div ref={mainTextRef}>
        <img
          className="main_text"
          src="/Material/main_text.png"
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
          className="image-frame_1"
          src="/Material/frame_1.png"
          alt="first frame"
        />
      </div>
    </div>
  );
};

export default FrameFirst;
