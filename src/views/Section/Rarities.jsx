import React, { useCallback } from "react";

// context
import { useFilter } from "../../context/FilterProvider";
import { useLanguage } from "../../context/LanguageProvider";

// images
import rarityAssets from "../../assets/rarities/rarities";

// db
import db from "../../db/cards.json";

const Rarities = () => {
  const { setFilterState, filterState } = useFilter();

  const { languageState } = useLanguage();

  const countByRarity = (rarity) =>
    Object.values(db.cards).filter((item) => item.rarity === rarity).length;

  const printRarities = useCallback(() => {
    return Object.keys(rarityAssets).map((item, i) => (
      <button
        onClick={() =>
          setFilterState({
            type: "toggle-rarity",
            rarity: db.rarities[item].id,
            value: filterState.rarityFilter[db.rarities[item].id]
              ? false
              : true,
          })
        }
        className={`rarity relative ${
          filterState.rarityFilter[db.rarities[item].id] ? "active" : ""
        }`}
        key={db.rarities[item].id}
        type="button"
      >
        <img src={rarityAssets[item]} alt={db.rarities[item].name} />
        <span
          className={`radial ${
            filterState.rarityFilter[db.rarities[item].id]
              ? "scale-up"
              : "scale-down"
          }`}
        >
          {countByRarity(db.rarities[item].id)}
        </span>
      </button>
    ));
  }, [filterState, setFilterState]);

  return (
    <div className="flex flex-col mr-3 gap-1">
      <h3 className="font-bold uppercase">
        {languageState.texts.Filters.Rarity.Title}
      </h3>
      <div className="flex gap-3">{printRarities()}</div>
    </div>
  );
};

export default Rarities;
