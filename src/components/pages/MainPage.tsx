import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frames, FrameFirst } from "../frames/index";

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  const descriptionRef = useRef(null);
  const frameRef = useRef<HTMLImageElement | null>(null);
  const mainFrameRef = useRef<HTMLImageElement | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const samsungLogoRef = useRef(null);
  const mainTextRef = useRef(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const animateTransition = () => {
    const tl = gsap.timeline();

    if (currentPage === 0) {
      tl.fromTo(
        mainFrameRef.current,
        { opacity: 0, zIndex: 5 },
        { opacity: 1, duration: 1 },
        "<"
      );
    } else {
      if (!frameRef.current) return;

      const prevFrame = frameRef.current.cloneNode(false);

      frameRef.current.parentNode?.appendChild(prevFrame);
      tl.fromTo(
        prevFrame,
        { opacity: 1, zIndex: 10 },
        { opacity: 0, duration: 0.5 },
        "<"
      );

      tl.to(frameRef.current, { opacity: 1, zIndex: 10 }, "<");

      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, x: "100%" },
        { opacity: 1, x: "0%", duration: 1, zIndex: 1 },
        "<"
      );

      tl.add(() => {
        prevFrame.parentNode?.removeChild(prevFrame);
      });
    }
  };

  const navigate = useNavigate();

  const handleClickPage = () => {
    navigate("/NewPage");
  };

  useEffect(() => {
    const tl = gsap.timeline();
    let interval = currentPage > 0 ? 4000 : 6000;

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

    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        const nextPage = currentPage >= 5 ? 1 : currentPage + 1;

        setCurrentPage(nextPage);
        animateTransition();
      }, interval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isAutoPlay, currentPage]);

  const handleUserInteraction = () => {
    setIsAutoPlay(false);

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = setTimeout(() => {
      setIsAutoPlay(true);
    }, 4000);
  };

  useEffect(() => {
    if (currentPage !== 0) {
      document.addEventListener("mousemove", handleUserInteraction);
      document.addEventListener("click", handleUserInteraction);

      return () => {
        document.removeEventListener("mousemove", handleUserInteraction);
        document.removeEventListener("click", handleUserInteraction);
      };
    }
  }, []);

  return (
    <div>
      <div className="frame">
        {currentPage === 0 ? (
          <FrameFirst
            handleClickPage={handleClickPage}
            samsungLogoRef={samsungLogoRef}
            mainTextRef={mainTextRef}
            mainFrameRef={mainFrameRef}
          />
        ) : (
          <Frames
            handleClickPage={handleClickPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            frameRef={frameRef}
            descriptionRef={descriptionRef}
            setIsAutoPlay={setIsAutoPlay}
            animateTransition={animateTransition}
          />
        )}
      </div>

      <img
        className="background_image"
        src={`${process.env.PUBLIC_URL}/material/BG.png`}
        alt="Background"
      />
    </div>
  );
};

export default MainPage;
