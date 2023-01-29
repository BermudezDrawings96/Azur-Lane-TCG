import React from "react";

// context
import { useLanguage } from "../../context/LanguageProvider";

// images
import tierAssets from "../../assets/tiers/tiers";

// db
import db from "../../db/cards.json";

const Tiers = () => {
  const { languageState } = useLanguage();

  const countByTier = (tier) =>
    Object.values(db.cards).filter((item) => item.tier === tier).length;

  return (
    <div className="flex flex-col mr-5">
      <h3 className="font-bold uppercase">
        {languageState.texts.Filters.Tier.Title}
      </h3>
      <div className="flex gap-5">
        {Object.keys(tierAssets).map((item, i) => (
          <button className="tier relative" key={item} type="button">
            <img src={tierAssets[item]} alt={db.tiers[item].id} />
            <span className="radial">{countByTier(db.tiers[item].id)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tiers;
