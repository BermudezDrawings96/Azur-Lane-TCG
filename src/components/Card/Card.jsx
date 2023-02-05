import React, { useState, useEffect } from "react";

// @fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as Full } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Regular } from "@fortawesome/free-regular-svg-icons";

const Card = (props) => {
  const { id, name, src } = props;

  const [hover, setHover] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const favorites = localStorage.getItem("favorites");
      if (favorites !== null) {
        const favoritesAsObject = JSON.parse(favorites);
        if (typeof favoritesAsObject === "object" && favoritesAsObject[id])
          setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
      localStorage.setItem("favorites", JSON.stringify({}));
    }
  }, [id]);

  const setThisAsFavorite = () => {
    try {
      const favorites = localStorage.getItem("favorites");
      if (favorites !== null) {
        const favoritesAsObject = JSON.parse(favorites);
        if (typeof favoritesAsObject === "object") {
          if (favoritesAsObject[id]) {
            setIsFavorite(false);
            favoritesAsObject[id] = false;
          } else {
            setIsFavorite(true);
            favoritesAsObject[id] = true;
          }
          localStorage.setItem("favorites", JSON.stringify(favoritesAsObject));
        } else {
          const newFavorites = {};
          newFavorites[id] = true;
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
          setThisAsFavorite(true);
        }
      } else {
        const newFavorites = {};
        newFavorites[id] = true;
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setThisAsFavorite(true);
      }
    } catch (err) {
      console.error(err);
      localStorage.setItem("favorites", JSON.stringify({}));
    }
  };

  return (
    <div
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      id={id}
      className="card"
    >
      <button
        onClick={setThisAsFavorite}
        className={`favorite-button ${
          hover ? "opacity-up" : "opacity-down"
        } text-red`}
      >
        <FontAwesomeIcon icon={isFavorite ? Full : Regular} />
      </button>
      <img src={src} alt={name} />
    </div>
  );
};

export default Card;
