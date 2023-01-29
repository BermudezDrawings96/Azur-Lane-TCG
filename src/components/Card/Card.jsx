import React from "react";

const Card = (props) => {
  const { id, name, src } = props;

  const parseImage = (image) =>
    image.replace("HBDimagebank/", "HBDimagebank/tr:w-250,tr:h-360/");

  return (
    <div id={id} className="card">
      <img src={parseImage(src)} alt={name} />
    </div>
  );
};

export default Card;
