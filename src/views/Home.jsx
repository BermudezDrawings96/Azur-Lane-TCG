import React, { useState } from "react";

// context
import { useLanguage } from "../context/LanguageProvider";

// images
import nationAssets from "../assets/nations/nations";
import rarityAssets from "../assets/rarities/rarities";
import tierAssets from "../assets/tiers/tiers";
import findIco from "../assets/FIND_ICO.png";
import meow from "../assets/MEOWFICIAL.png";

// db
import db from "../db/cards.json";

// components
import Card from "../components/Card/Card";

const Home = () => {
  const { languageState } = useLanguage();

  const [toSearch, setToSearch] = useState("");

  return (
    <div>
      <div className="flex header gap-3">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold uppercase">
              {languageState.texts.Filters.Nations.Title}
            </h3>
            <div className="flex gap-2">
              {Object.keys(nationAssets).map((item) => (
                <button
                  key={db.nations[item].id}
                  className="nation"
                  type="button"
                >
                  <img src={nationAssets[item]} alt={db.nations[item].name} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col mr-3 gap-1">
              <h3 className="font-bold uppercase">
                {languageState.texts.Filters.Rarity.Title}
              </h3>
              <div className="flex gap-5">
                {Object.keys(rarityAssets).map((item, i) => (
                  <button
                    className="rarity"
                    key={db.rarities[item].id}
                    type="button"
                  >
                    <img
                      src={rarityAssets[item]}
                      alt={db.rarities[item].name}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col mr-5 gap">
              <h3 className="font-bold uppercase">
                {languageState.texts.Filters.Tier.Title}
              </h3>
              <div className="flex gap-5">
                {Object.keys(tierAssets).map((item, i) => (
                  <button className="font-bold tier" key={item} type="button">
                    <img src={tierAssets[item]} alt={db.tiers[item].id} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold uppercase">
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
          <div className="flex gap-3 search-container">
            <div className="relative">
              <input
                value={toSearch}
                className="search"
                placeholder={languageState.texts.Filters.Search.placeholder}
                onChange={(e) => setToSearch(e.target.value)}
              />
              <img className="find" src={findIco} alt="find" />
            </div>
            <div className="flex items-center gap-2 checkbox-container">
              <input type="checkbox" name="id" id="id" />
              <label htmlFor="id">
                {languageState.texts.Filters.Search.id}
              </label>
            </div>
            <div className="flex items-center gap-2 checkbox-container">
              <input type="checkbox" name="favorites" id="favorites" />
              <label htmlFor="favorites">
                {languageState.texts.Filters.Search.favorites}
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <span className="uppercase meow-span">
            {languageState.texts.Filters.Tutorial}
          </span>
          <img src={meow} alt="meow" className="meow" />
        </div>
      </div>
      <div className="main">
        {Object.values(db.cards).map((item) => (
          <Card {...item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
