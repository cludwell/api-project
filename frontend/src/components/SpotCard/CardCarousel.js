import { useEffect, useState } from "react";
import "./CardCarousel.css";
import { NavLink } from "react-router-dom";

export default function CardCarousel({ spot, chosenImage, setChosenImage }) {
  const [current, setCurrent] = useState(0);
  const nextImage = () => {
    setCurrent(
      current < spot.images.length - 1 ? current + 1 : spot.images.length - 1
    );
    setChosenImage(
      current < spot.images.length - 1 ? current + 1 : spot.images.length - 1
    );
  };
  const prevImage = () => {
    setCurrent(current > 0 ? current - 1 : 0);
    setChosenImage(current > 0 ? current - 1 : 0);
  };
  const dotTicker = (i) => {
    setChosenImage(i);
    setCurrent(i);
  };
  useEffect(() => {
    setCurrent(chosenImage ? chosenImage : chosenImage === 0 ? 0 : current);
  }, [chosenImage, current]);

  useEffect(() => {
    // Preload images with alt text and classNames
    spot.images.forEach((image, i) => {
      const img = new Image();
      img.src = image.url;
      img.alt = image.altText; // Set the alt text based on your data structure
      img.className = `slider-images spot-image ${i === current ? "loaded" : ""}`;
    });
  }, [spot.images, current]);

  return (
    <div className="card-carousel">
      <div
        className={current > 0 ? "left-arrow" : "hidden"}
        onClick={prevImage}
      >
        <i className="fa-solid fa-circle-left" />
      </div>

      <div
        className={current < spot.images.length - 1 ? "right-arrow" : "hidden"}
        onClick={nextImage}
      >
        <i className="fa-solid fa-circle-right" />
      </div>
      {spot.images.map((img, i) => (
        <div
          className={i === current ? "slide active" : "slide"}
          key={`carousel${i}`}
        >
          {i === current && (
            <NavLink
              to={`/spotsfe/${spot.id}`}
              style={{ textDecoration: "none" }}
              spotId={spot.id}
            >
              <img
                src={img.url}
                className="slider-images spot-image"
                alt=""
                key={`img${i}`}
              />
            </NavLink>
          )}
        </div>
      ))}
      <div className="dot-ticker-div">
        {spot.images.map((ele, i) => (
          <span
            className={i === current ? "dot-ticker-chosen" : "dot-ticker"}
            onClick={(e) => dotTicker(i)}
          >
            ●{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
