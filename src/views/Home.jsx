import React from "react";

// context
import { useLanguage } from "../context/LanguageProvider";

const Home = () => {
  const { languageState } = useLanguage();

  return (
    <div className="flex flex-col header">
      <div className="flex">
        <div className="flex flex-col">
          <h3 className="font-bold">
            {languageState.texts.Filters.Nations.Title}
          </h3>

          <div className="flex gap-2">
            {languageState.texts.Filters.Nations.Nations.map((item) => (
              <button key={item.label} className="nation" type="button">
                <img src={item.src} alt={item.label} />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">
            {languageState.texts.Filters.Types.Title}
          </h3>
          <div className="flex gap-5">
            {languageState.texts.Filters.Types.Types.map((item, i) => (
              <button className="type" key={item.label} type="button">
                <span>{item.label}</span>
                <span className="font-bold">{i}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <h3 className="font-bold">
            {languageState.texts.Filters.Rarity.Title}
          </h3>
          <div className="flex gap-5">
            {languageState.texts.Filters.Rarity.Numbers.map((item, i) => (
              <button className="rarity" key={item.label} type="button">
                <img src={item.src} alt={item.label} />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">
            {languageState.texts.Filters.Tier.Title}
          </h3>
          <div className="flex gap-5">
            {languageState.texts.Filters.Tier.Tiers.map((item, i) => (
              <button className="font-bold tier" key={item} type="button">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
