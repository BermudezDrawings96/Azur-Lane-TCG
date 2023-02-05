import React, { useReducer, useEffect, useCallback } from "react";

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

  const countNationById = useCallback(
    (item) =>
      filterState.result.filter(
        (jtem) => String(jtem.nation) === String(item.id)
      ).length,
    [filterState]
  );

  const nationsReducer = (nationsState, action) => {
    const { type } = action;
    switch (type) {
      case "set": {
        const { array } = action;
        return array;
      }
      case "toggle": {
        const { target } = action;
        const newArray = [...nationsState];
        const toModify = newArray.find((item) => item.id === target);
        if (toModify) toModify.active = toModify.active ? false : true;
        return [...newArray];
      }
      default:
        return [...nationsState];
    }
  };

  const [nationsState, setNationsState] = useReducer(nationsReducer, []);

  useEffect(() => {
    setNationsState({ type: "set", array: Object.values(db.nations) });
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-bold uppercase">
        {languageState.texts.Filters.Nations.Title}
      </h3>
      <div className="flex gap-2">
        {nationsState.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setNationsState({ type: "toggle", target: item.id });
              setFilterState({
                type: "toggle-nation",
                nation: item.id,
                value: item.active ? false : true,
              });
            }}
            className={`nation relative ${item.active ? "active" : ""}`}
            type="button"
          >
            <img src={nationAssets[item.id]} alt={item.name} />
            <span
              className={`radial ${item.active ? "scale-up" : "scale-down"}`}
            >
              {countNationById(item)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Nations;
