import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentText, setCurrentText] = useState([
    `"The first time I used the Samsung Bespoke Jet™, I cried. I’m not being sensational; I really did. Of course, this vacuum worked great. But that’s not all."`,
    `"If you’re an over-cleaner, like myself, you’ll nerd out on all of the functions. If you avoid this chore at all costs, you’ll appreciate how simple Samsung makes it."`,
    `"Both the floor and pet hair attachments are cleverly designed to eliminate the dreaded hair wrap. (In other words, you’ll never have to tackle hair tangles with a pair of scissors again.)"`,
    `"When I learned the Samsung Bespoke Vac cleaned itself with amazing technology, that’s when I cried. No more scraping spider legs and hair out of the crevices with my hands. Its suction power is so strong, the canister is left perfectly clean after every use. It’s like a vacuum for your vacuum."`,
    `"Because it’s so nice-looking, it can live right in the kitchen. No more hauling a vacuum up and down the basement stairs on the daily"`,
  ]);

  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const descriptionRef = useRef(null);
  const frameRef = useRef(null);
  const autoPlayRef = useRef(null);
  const samsungLogoRef = useRef(null);
  const mainTextRef = useRef(null);

  const animateTransition = (newPage) => {
    const tl = gsap.timeline();
    const prevFrame = frameRef.current.cloneNode(true);
    frameRef.current.parentNode.appendChild(prevFrame);

    // tl.to(prevFrame, { zIndex: 2 }, "<");
    tl.to(prevFrame, { opacity: 1, duration: 3, delay: 0.1 });

    if (currentPage === 0) {
      tl.fromTo(
        frameRef.current,
        { opacity: 0, zIndex: 1 },
        { opacity: 1, duration: 1, zIndex: 2 },
        "<"
      );
      tl.fromTo(
        descriptionRef.current,
        { x: "-100%", opacity: 1 },
        { x: "0%", opacity: 1, duration: 1 },
        "<"
      );
    } else {
      // tl.fromTo(
      //   frameRef.current,
      //   { opacity: 0, zIndex: newPage + 1 },
      //   { opacity: 1, duration: 3 },
      //   "<"
      // );
      // frameRef.current.src = `/Material/frame_${currentPage-1}.png`;
      tl.fromTo(
        frameRef.current,
        { opacity: 0, zIndex: newPage + 2 },
        { opacity: 1, duration: 3 },
        "<"
      );

      tl.fromTo(
        descriptionRef.current,
        { x: "100%", zIndex: 1 },
        { x: "0%", duration: 3, zIndex: 1 },
        "<"
      );
    }

    tl.add(() => {
      prevFrame.parentNode.removeChild(prevFrame);
    });
  };

  const navigate = useNavigate();

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

  const handleClickPage = () => {
    navigate("/NewPage");
  };

  useEffect(() => {
    const tl = gsap.timeline();

    if (currentPage === 0) {
      tl.fromTo(
        samsungLogoRef.current,
        {
          y: "50px",
          x: "-100%",
        },
        {
          x: "0%",
          duration: 2,
        }
      );

      tl.fromTo(
        samsungLogoRef.current,
        {
          y: "50px",
        },
        {
          y: "0px",
          duration: 1,
        }
      );

      tl.fromTo(
        mainTextRef.current,
        {
          x: "-100%",
        },
        {
          x: "0%",
          duration: 2,
        }
      );
    }

    // tl.eventCallback("onComplete", () => {
    //   if (isAutoPlay) {
    //     autoPlayRef.current = setInterval(() => {
    //       const nextPage = currentPage >= 5 ? 1 : currentPage + 1;
    //       setCurrentPage(nextPage);
    //       animateTransition(nextPage);
    //     }, 4000);
    //   }
    // });

    // return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, currentPage]);

  return (
    <div>
      <div className="frame">
        {currentPage === 0 ? (
          <div className="frame-1">
            <div ref={samsungLogoRef}>
              <img
                className="logo samsung_logo"
                src="/Material/Samsung.png"
                alt="logo"
              />
            </div>

            <img
              className="logo bespoke_jet"
              src="/Material/Bespoke_JetTM.png"
              alt="bespoke_jet"
            />

            <div ref={mainTextRef}>
              <img
                className="main_text"
                src="/Material/main_text.png"
                alt="main_text"
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
                alt="frame-1"
              />
            </div>
          </div>
        ) : (
          <div className="frame-1">
            <div>
              <img
                ref={frameRef}
                className="image-right"
                src={`/Material/frame_${currentPage + 1}.png`}
                alt={`frame-${currentPage + 1}`}
              />
            </div>

            <img
              className="logo samsung_logo"
              src="/Material/Samsung.png"
              alt="logo"
            />

            <img
              className="logo bespoke_jet"
              src="/Material/Bespoke_JetTM.png"
              alt="bespoke_jet"
            />

            <img
              className="main_text main_text-frames"
              src="/Material/main_text.png"
              alt="main_text"
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
                    alt="prev"
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
                    alt="prev"
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
        )}
      </div>

      <img
        className="background_image"
        src="/Material/BG.png"
        alt="Background"
      />
    </div>
  );
};

export default MainPage;
