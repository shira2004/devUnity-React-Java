
import React, { useState, useEffect } from "react";
import { CarouselItem } from "./CarouselItem";
import './Carusel.css';
import Love_it from '../Media/love_re.png';
import code_review from '../Media/Code_review.png';
import Dev_productivity from '../Media/Dev_productivity.png'
import mobile_content from '../Media/mobile_content.png'

import Header from '../../../Header/Header'

const AutoMoveCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userClicked, setUserClicked] = useState(false);
  const items = [
    {
      title: "code lover",
      description:
        "Welcome to the Love It arena – where code enthusiasts come together for an inspiring play. Each contribution is a move toward refining code, inspecting details, and creating a harmonious symphony of collaboration.",
      icon: Love_it,
    },
    {
      title: "Dev Productivity",
      description:
        "Maximize your developer productivity in the Dev Productivity league. Investor Updates serve as the playbook, guiding each play toward navigating the future of technology with precision and strategic collaboration.",
      icon: Dev_productivity,
    },
    {
      title: "code - review",
      description:
        "Step up to the plate in Web Development – a space where code review is the name of the game. As players in this field, contributors engage in plays that elevate the quality of web solutions, ensuring excellence at every turn. ",
      icon: code_review,
    },
    {
      title: "Mobile Content",
      description:
        "Experience the thrill of innovation in the mobile realm with Selected Box. Like a well-played inning, contributors take turns crafting cutting-edge mobile content that sets new standards in the game of technology.",
      icon: mobile_content,
    },
  ];

  const updateIndex = (newIndex) => {
    if (!userClicked) {
      if (newIndex < 0) {
        newIndex = 0;
      } else if (newIndex >= items.length) {
        newIndex = 0;
      }

      setActiveIndex(newIndex);
    }
  };

  const handlePrev = () => {
    setUserClicked(true);
    updateIndex(activeIndex - 1);
  };

  const handleNext = () => {
    setUserClicked(true);
    updateIndex(activeIndex + 1);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setUserClicked(false);
      updateIndex(activeIndex + 1);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [activeIndex, userClicked]);

  return (

    <>
    
   <Header/>
   <div className="carousel">
    <div >
      <div
        className="inner"
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {items.map((item) => {
          return <CarouselItem item={item} width={"100%"} />;
        })}
      </div>

      <div className="carousel-buttons">
        <button
          className="button-arrow"
          onClick={() => {
            handlePrev();
          }}
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className="indicators">
          {items.map((item, index) => {
            return (
              <button
                className="indicator-buttons"
                key={index}
                onClick={() => {
                  handleNext();
                }}
              >
                <span
                  className={`material-symbols-outlined ${
                    index === activeIndex
                      ? "indicator-symbol-active"
                      : "indicator-symbol"
                  }`}
                >
                  radio_button_checked
                </span>
              </button>
            );
          })}
        </div>
        <button
          className="button-arrow"
          onClick={() => {
            handleNext();
          }}
        >
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
    </div>
    </>
    
  );
};

export default AutoMoveCarousel;

