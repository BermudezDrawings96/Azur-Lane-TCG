import React from "react";
import { Link } from "react-router-dom";

// context
import { useLanguage } from "../../context/LanguageProvider";

const Navbar = () => {
  const { languageState } = useLanguage();

  return (
    <div className="navbar">
      <div className="flex gap-3">
        <span>LOGO</span>
        <span className="uppercase">{languageState.texts.Navbar.Title}</span>
      </div>
      <div className="links">
        {languageState.texts.Navbar.Links.map((item) => (
          <Link className="uppercase font-bold" to={item.to}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
