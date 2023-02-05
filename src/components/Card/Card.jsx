import React, { useState } from "react";

// @fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as Full } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Regular } from "@fortawesome/free-regular-svg-icons";

const Card = (props) => {
  const { id, name, src, favorite, makeFavorite, onClick } = props;

  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      id={id}
      className="card"
    >
      <button
        onClick={(e) => {
          makeFavorite(id);
          e.preventDefault();
        }}
        className={`favorite-button ${
          hover ? "opacity-up" : "opacity-down"
        } text-red`}
      >
        <FontAwesomeIcon icon={favorite ? Full : Regular} />
      </button>
      <img src={src} alt={name} />
    </div>
  );
};

export default Card;
