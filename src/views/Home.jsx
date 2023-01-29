import React from "react";

// context
import { useLanguage } from "../context/LanguageProvider";

// images
import meow from "../assets/MEOWFICIAL.png";

// db
import db from "../db/cards.json";

// components
import Card from "../components/Card/Card";
import Nations from "./Section/Nations";
import Tiers from "./Section/Tiers";
import Rarities from "./Section/Rarities";
import Types from "./Section/Types";
import Search from "./Section/Search";

const Home = () => {
  const { languageState } = useLanguage();

  return (
    <div>
      <div className="flex header gap-3">
        <div className="flex flex-col gap-7">
          <Nations />
          <div className="flex">
            <Rarities />
            <Tiers />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Types />
          <Search />
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
