import React from "react";

const Card = (props) => {
  const { id, name, src } = props;

  return (
    <div id={id} className="card">
      <img src={src} alt={name} />
    </div>
  );
};

export default Card;
