import React from "react";

// context
import { useLanguage } from "../../context/LanguageProvider";

// images
import rarityAssets from "../../assets/rarities/rarities";

// db
import db from "../../db/cards.json";

const Rarities = () => {
  const { languageState } = useLanguage();

  const countByRarity = (rarity) =>
    Object.values(db.cards).filter((item) => item.rarity === rarity).length;

  return (
    <div className="flex flex-col mr-3 gap-1">
      <h3 className="font-bold uppercase">
        {languageState.texts.Filters.Rarity.Title}
      </h3>
      <div className="flex gap-5">
        {Object.keys(rarityAssets).map((item, i) => (
          <button
            className="rarity relative"
            key={db.rarities[item].id}
            type="button"
          >
            <img src={rarityAssets[item]} alt={db.rarities[item].name} />
            <span className="radial">
              {countByRarity(db.rarities[item].id)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Rarities;
