import React, { useCallback } from "react";

// context
import { useFilter } from "../../context/FilterProvider";
import { useLanguage } from "../../context/LanguageProvider";

// db
import db from "../../db/cards.json";

// images
import nationAssets from "../../assets/nations/nations";

const Nations = () => {
  const { setFilterState, filterState } = useFilter();
  const { languageState } = useLanguage();

  const countByNation = (nation) =>
    Object.values(db.cards).filter((item) => item.nation === nation).length;

  const printNations = useCallback(() => {
    return Object.keys(nationAssets).map((item) => (
      <button
        onClick={() =>
          setFilterState({
            type: "toggle-nation",
            nation: db.nations[item].id,
            value: filterState.nationFilter[db.nations[item].id] ? false : true,
          })
        }
        key={db.nations[item].id}
        className={`nation relative ${
          filterState.nationFilter[db.nations[item].id] ? "active" : ""
        }`}
        type="button"
      >
        <img src={nationAssets[item]} alt={db.nations[item].name} />
        <span
          className={`radial ${
            filterState.nationFilter[db.nations[item].id]
              ? "scale-up"
              : "scale-down"
          }`}
        >
          {countByNation(db.nations[item].id)}
        </span>
      </button>
    ));
  }, [filterState, setFilterState]);

  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-bold uppercase">
        {languageState.texts.Filters.Nations.Title}
      </h3>
      <div className="flex gap-2">{printNations()}</div>
    </div>
  );
};

export default Nations;
