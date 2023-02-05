import React, { useEffect, useState } from "react";

// context
import { useFilter } from "../../context/FilterProvider";
import { useLanguage } from "../../context/LanguageProvider";

// images
import findIco from "../../assets/FIND_ICO.png";

const Search = () => {
  const { setFilterState } = useFilter();
  const { languageState } = useLanguage();

  const [toSearch, setToSearch] = useState("");

  const [timeOut, setTimeOut] = useState(null);
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    if (toSearch.length) {
      clearTimeout(timeOut);
      setTimeOut(
        setTimeout(() => {
          setAsk(true);
        }, 1500)
      );
    }
  }, [toSearch]);

  useEffect(() => {
    if (ask) {
      setFilterState({ type: "change-input", value: toSearch });
      setAsk(false);
    }
  }, [ask]);

  return (
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
        <input
          value={toSearch}
          onChange={(e) => setToSearch(e.target.value)}
          type="checkbox"
          name="id"
          id="id"
        />
        <label htmlFor="id">{languageState.texts.Filters.Search.id}</label>
      </div>
      <div className="flex items-center gap-2 checkbox-container">
        <input type="checkbox" name="favorites" id="favorites" />
        <label htmlFor="favorites">
          {languageState.texts.Filters.Search.favorites}
        </label>
      </div>
    </div>
  );
};

export default Search;
