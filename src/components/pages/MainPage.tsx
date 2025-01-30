import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frames, FrameFirst } from "../frames/index";

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  const descriptionRef = useRef(null);
  const frameRef = useRef<HTMLImageElement  | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const samsungLogoRef = useRef(null);
  const mainTextRef = useRef(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const animateTransition = (newPage: number) => {
    if (!frameRef.current) return;

    const tl = gsap.timeline();
    const prevFrame = frameRef.current.cloneNode(true) as HTMLDivElement;
    const parent = frameRef.current.parentNode as HTMLElement | null;

    if (!parent) return;

    parent.appendChild(prevFrame);

    tl.to(prevFrame, { zIndex: 2 }, "<");

    if (currentPage === 0) {
      tl.fromTo(
        frameRef.current,
        { opacity: 0, zIndex: 1 },
        { opacity: 1, duration: 1 },
        "<"
      );
      tl.fromTo(
        descriptionRef.current,
        { x: "-100%", opacity: 1 },
        { x: "0%", opacity: 1, duration: 1 },
        "<"
      );
    } else {
      tl.fromTo(
        frameRef.current,
        { opacity: 0, zIndex: newPage + 5 },
        { opacity: 1, duration: 0.5 },
        "<"
      );

      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, x: "100%" },
        { opacity: 1, x: "0%", duration: 1, zIndex: 1 },
        "<"
      );
    }

    tl.add(() => {
      parent.removeChild(prevFrame);
    });
  };

  const navigate = useNavigate();

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

    tl.eventCallback("onComplete", () => {
      if (isAutoPlay) {
        autoPlayRef.current = setInterval(() => {
          const nextPage = currentPage >= 5 ? 1 : currentPage + 1;

          setCurrentPage(nextPage);
          animateTransition(nextPage);
        }, 4000);
      }
    });

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
    }, 3000);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleUserInteraction);
    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("mousemove", handleUserInteraction);
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  return (
    <div>
      <div className="frame">
        {currentPage === 0 ? (
          <FrameFirst
            handleClickPage={handleClickPage}
            samsungLogoRef={samsungLogoRef}
            mainTextRef={mainTextRef}
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
        src="/material/BG.png"
        alt="Background"
      />
    </div>
  );
};

export default MainPage;
