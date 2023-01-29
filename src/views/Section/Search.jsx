import React, { useState } from "react";

// context
import { useLanguage } from "../../context/LanguageProvider";

// images
import findIco from "../../assets/FIND_ICO.png";

const Search = () => {
  const { languageState } = useLanguage();

  const [toSearch, setToSearch] = useState("");

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
        <input type="checkbox" name="id" id="id" />
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
