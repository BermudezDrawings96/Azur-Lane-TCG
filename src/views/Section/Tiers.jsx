import React, { useReducer, useEffect, useCallback } from "react";

// context
import { useFilter } from "../../context/FilterProvider";
import { useLanguage } from "../../context/LanguageProvider";

// db
import db from "../../db/cards.json";

// images
import tierAssets from "../../assets/tiers/tiers";

const Tiers = () => {
  const { setFilterState, filterState } = useFilter();
  const { languageState } = useLanguage();

  const countTierById = useCallback(
    (item) =>
      filterState.result.filter((jtem) => String(jtem.tier) === String(item.id))
        .length,
    [filterState]
  );

  const tiersReducer = (tiersState, action) => {
    const { type } = action;
    switch (type) {
      case "set": {
        const { array } = action;
        return array;
      }
      case "toggle": {
        const { target } = action;
        const newArray = [...tiersState];
        const toModify = newArray.find((item) => item.id === target);
        if (toModify) toModify.active = toModify.active ? false : true;
        return [...newArray];
      }
      default:
        return [...tiersState];
    }
  };

  const [tiersState, setTiersState] = useReducer(tiersReducer, []);

  useEffect(() => {
    setTiersState({ type: "set", array: Object.values(db.tiers) });
  }, []);

  return (
    <div className="flex flex-col mr-5">
      <h3 className="font-bold uppercase">
        {languageState.texts.Filters.Tier.Title}
      </h3>
      <div className="flex gap-3 mt-1">
        {tiersState.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setTiersState({ type: "toggle", target: item.id });
              setFilterState({
                type: "toggle-tier",
                tier: item.id,
                value: item.active ? false : true,
              });
            }}
            className={`tier relative ${item.active ? "active" : ""}`}
            type="button"
          >
            <img src={tierAssets[item.id]} alt={item.id} />
            <span
              className={`radial ${item.active ? "scale-up" : "scale-down"}`}
            >
              {countTierById(item)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tiers;
