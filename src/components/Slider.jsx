import phonesImg from "../assets/phones.webp";
import watchesImg from "../assets/smartwatches.png";
import audioImg from "../assets/audio.png";
import slideRight from "../assets/slideRight.svg";
import slideLeft from "../assets/slideLeft.svg";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Slider({ setFilter }) {
  const [slideNumber, setSlideNumber] = useState(0);
  const [startTouch, setStartTouch] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const slideContents = [
    {
      image: phonesImg,
      title: "Best Offers on Smartphones - Limited Time!",
      filter: "ST",
      desc: "Upgrade your mobile experience with incredible deals on top smartphones, featuring cutting-edge camera technology like the impressive multi-lens systems shown. Don't miss out – these offers are for a limited time only!",
    },
    {
      image: watchesImg,
      title: "Incredible Savings on Top Wearables",
      filter: "AW",
      desc: "Elevate your wrist game! Discover limited-time deals on our top smartwatches, packed with features to track your health, connect you to your world, and look stylish while doing it. Don't wait, these offers won't last!",
    },
    {
      image: audioImg,
      title: "Up to 50% Off on Headphones, Earbuds & Speakers!",
      filter: "AW",
      desc: "Immerse yourself in premium sound. Discover deals on high-quality headphones, earbuds, and speakers for every audio need. Whether you're an audiophile, a fitness enthusiast, or a casual listener, find your perfect audio companion with crystal-clear sound and comfortable designs.",
    },
  ];
  const totalSlides = slideContents.length;
  const slides = slideContents.map((content, index) => {
    const filterResults = () => {
      setFilter(content.filter);
      navigate("/shop");
    };
    return (
      <div key={index} className="slide">
        <div className="text">
          <h3>{content.title}</h3>
          <p>{content.desc}</p>
          <button onClick={filterResults}>Explore</button>
        </div>
        <div className="image-container" onClick={filterResults}>
          <img src={content.image} alt="Offer Image" />
        </div>
      </div>
    );
  });

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setSlideNumber((prev) => (prev + 1) % totalSlides);
    }, 5000);
  }, [totalSlides]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleTouchStart = (e) => {
    const touchStart = e.touches[0].clientX;
    setStartTouch(touchStart);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const swipeDistance = startTouch - touchEnd;

    if (swipeDistance > 50) {
      // Swipe left (next slide)
      setSlideNumber((prev) => (prev + 1) % totalSlides);
    } else if (swipeDistance < -50) {
      // Swipe right (previous slide)
      setSlideNumber((prev) => (prev - 1 + totalSlides) % totalSlides);
    }

    resetTimer(); // Restart the timer when swiping
  };

  return (
    <>
      <h2>Best Deals</h2>
      <div
        className="slider-window"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slider"
          style={{
            transform: `translateX(-${(slideNumber % totalSlides) * 100}%)`,
          }}
          data-testid="slider-container"
        >
          {slides}
        </div>
        <button
          className="right-btn"
          onClick={() => {
            setSlideNumber((slideNum) => (slideNum + 1) % totalSlides);
            resetTimer();
          }}
        >
          <img src={slideRight} alt="Next Slide" />
        </button>
        <button
          className="left-btn"
          onClick={() => {
            setSlideNumber(
              (slideNum) => (slideNum - 1 + totalSlides) % totalSlides,
            );
            resetTimer();
          }}
        >
          <img src={slideLeft} alt="Previous Slide" />
        </button>
        <div className="progress">
          <div
            className={`dot ${slideNumber == 0 ? "active" : ""}`}
            onClick={() => {
              setSlideNumber(0);
              resetTimer();
            }}
          ></div>
          <div
            className={`dot ${slideNumber == 1 ? "active" : ""}`}
            onClick={() => {
              setSlideNumber(1);
              resetTimer();
            }}
          ></div>
          <div
            className={`dot ${slideNumber == 2 ? "active" : ""}`}
            onClick={() => {
              setSlideNumber(2);
              resetTimer();
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

Slider.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
