import React, { useCallback } from "react";

// context
import { useFilter } from "../../context/FilterProvider";
import { useLanguage } from "../../context/LanguageProvider";

// images
import tierAssets from "../../assets/tiers/tiers";

// db
import db from "../../db/cards.json";

const Tiers = () => {
  const { setFilterState, filterState } = useFilter();

  const { languageState } = useLanguage();

  const countByTier = (tier) =>
    Object.values(db.cards).filter((item) => item.tier === tier).length;

  const printTiers = useCallback(() => {
    return Object.keys(tierAssets).map((item, i) => (
      <button
        onClick={() =>
          setFilterState({
            type: "toggle-tier",
            tier: db.tiers[item].id,
            value: filterState.tierFilter[db.tiers[item].id] ? false : true,
          })
        }
        className={`tier relative ${
          filterState.tierFilter[db.tiers[item].id] ? "active" : ""
        }`}
        key={item}
        type="button"
      >
        <img src={tierAssets[item]} alt={db.tiers[item].id} />
        <span
          className={`radial ${
            filterState.tierFilter[db.tiers[item].id]
              ? "scale-up"
              : "scale-down"
          }`}
        >
          {countByTier(db.tiers[item].id)}
        </span>
      </button>
    ));
  }, [filterState, setFilterState]);

  return (
    <div className="flex flex-col mr-5">
      <h3 className="font-bold uppercase">
        {languageState.texts.Filters.Tier.Title}
      </h3>
      <div className="flex gap-3 mt-1">{printTiers()}</div>
    </div>
  );
};

export default Tiers;
