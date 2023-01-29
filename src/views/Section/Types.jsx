import React from "react";

// context
import { useLanguage } from "../../context/LanguageProvider";

// db
import db from "../../db/cards.json";

const Types = () => {
  const { languageState } = useLanguage();

  const countByType = (type) =>
    Object.values(db.cards).filter((item) => item.type === type).length;

  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-bold uppercase">
        {languageState.texts.Filters.Types.Title}
      </h3>
      <div className="flex gap-5">
        {Object.values(db.types).map((item, i) => (
          <button className="type" key={item.id} type="button">
            <span>{item.name}</span>
            <span className="radial">{countByType(item.id)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Types;
