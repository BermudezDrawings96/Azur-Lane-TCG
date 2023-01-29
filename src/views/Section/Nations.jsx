import React from "react";

// context
import { useLanguage } from "../../context/LanguageProvider";

// db
import db from "../../db/cards.json";

// images
import nationAssets from "../../assets/nations/nations";

const Nations = () => {
  const { languageState } = useLanguage();

  const countByNation = (nation) =>
    Object.values(db.cards).filter((item) => item.nation === nation).length;

  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-bold uppercase">
        {languageState.texts.Filters.Nations.Title}
      </h3>
      <div className="flex gap-2">
        {Object.keys(nationAssets).map((item) => (
          <button
            key={db.nations[item].id}
            className="nation relative"
            type="button"
          >
            <img src={nationAssets[item]} alt={db.nations[item].name} />
            <span className="radial">{countByNation(db.nations[item].id)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Nations;
