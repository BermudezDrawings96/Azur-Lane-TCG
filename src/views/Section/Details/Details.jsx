import React, { useEffect, useMemo } from "react";

// @fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";

// contexts
import { useLanguage } from "../../../context/LanguageProvider";

const Details = (props) => {
  const { visible, onClose } = props;

  const { languageState } = useLanguage();

  const details = useMemo(() => {
    return languageState.texts.Details;
  }, [languageState]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
  }, [visible]);

  return (
    <div
      className={`flex items-center gap-5 ${
        visible ? "z-10" : "z-0"
      } top-0 left-0 transition fixed my-blur ${
        visible ? "opacity-up" : "opacity-down"
      } w-full h-full`}
    >
      <button onClick={onClose} className="absolute right-2 top-5 close">
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div>
        <div className="sidebar">
          <h4 className="h4 uppercase text-white font-bold">
            {details.Family.Title}
          </h4>
          <div className="flex flex-col gap-2 items-center">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="family">
                1
              </div>
            ))}
            <button className="text-white down">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="image-template"></div>
        
      </div>
    </div>
  );
};

Details.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Details;
