import React from "react";
import { Link } from "react-router-dom";

// context
import { useLanguage } from "../../context/LanguageProvider";

// images
import logoIco from "../../assets/LOGO_ICO.png";

const Navbar = () => {
  const { languageState } = useLanguage();

  return (
    <div className="navbar">
      <div className="flex gap-3 items-center">
        <img className="logo" src={logoIco} alt="logo" />
        <span className="uppercase name">
          {languageState.texts.Navbar.Title}
        </span>
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
