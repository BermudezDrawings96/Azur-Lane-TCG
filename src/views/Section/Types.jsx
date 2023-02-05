import React, { useReducer, useEffect, useCallback } from "react";

// context
import { useFilter } from "../../context/FilterProvider";
import { useLanguage } from "../../context/LanguageProvider";

// db
import db from "../../db/cards.json";

const Types = () => {
  const { setFilterState, filterState } = useFilter();
  const { languageState } = useLanguage();

  const countTypeById = useCallback(
    (item) =>
      filterState.result.filter((jtem) => String(jtem.type) === String(item.id))
        .length,
    [filterState]
  );

  const typesReducer = (typesState, action) => {
    const { type } = action;
    switch (type) {
      case "set": {
        const { array } = action;
        return array;
      }
      case "toggle": {
        const { target } = action;
        const newArray = [...typesState];
        const toModify = newArray.find((item) => item.id === target);
        if (toModify) toModify.active = toModify.active ? false : true;
        return [...newArray];
      }
      default:
        return [...typesState];
    }
  };

  const [typesState, setTypesState] = useReducer(typesReducer, []);

  useEffect(() => {
    setTypesState({ type: "set", array: Object.values(db.types) });
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-bold uppercase">
        {languageState.texts.Filters.Types.Title}
      </h3>
      <div className="flex gap-5">
        {typesState.map((item, i) => (
          <button
            onClick={() => {
              setTypesState({ type: "toggle", target: item.id });
              setFilterState({
                type: "toggle-type",
                cal: item.id,
                value: item.active ? false : true,
              });
            }}
            className="type"
            key={item.id}
            type="button"
          >
            <span>{item.name}</span>
            <span
              className={`radial ${item.active ? "scale-up" : "scale-down"}`}
            >
              {countTypeById(item)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Types;
