import React, { useReducer, useEffect, useCallback } from "react";

// context
import { useFilter } from "../../context/FilterProvider";
import { useLanguage } from "../../context/LanguageProvider";

// db
import db from "../../db/cards.json";

// images
import rarityAssets from "../../assets/rarities/rarities";

const Rarities = () => {
  const { setFilterState, filterState } = useFilter();
  const { languageState } = useLanguage();

  const countRarityById = useCallback(
    (item) =>
      filterState.result.filter(
        (jtem) => String(jtem.rarity) === String(item.id)
      ).length,
    [filterState]
  );

  const raritiesReducer = (raritiesState, action) => {
    const { type } = action;
    switch (type) {
      case "set": {
        const { array } = action;
        return array;
      }
      case "toggle": {
        const { target } = action;
        const newArray = [...raritiesState];
        const toModify = newArray.find((item) => item.id === target);
        if (toModify) toModify.active = toModify.active ? false : true;
        return [...newArray];
      }
      default:
        return [...raritiesState];
    }
  };

  const [raritiesState, setRaritiesState] = useReducer(raritiesReducer, []);

  useEffect(() => {
    setRaritiesState({ type: "set", array: Object.values(db.rarities) });
  }, []);

  return (
    <div className="flex flex-col mr-3 gap-1">
      <h3 className="font-bold uppercase">
        {languageState.texts.Filters.Rarity.Title}
      </h3>
      <div className="flex gap-3">
        {raritiesState.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setRaritiesState({ type: "toggle", target: item.id });
              setFilterState({
                type: "toggle-rarity",
                rarity: item.id,
                value: item.active ? false : true,
              });
            }}
            className={`rarity relative ${item.active ? "active" : ""}`}
            type="button"
          >
            <img src={rarityAssets[item.id]} alt={item.name} />
            <span
              className={`radial ${item.active ? "scale-up" : "scale-down"}`}
            >
              {countRarityById(item)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Rarities;
