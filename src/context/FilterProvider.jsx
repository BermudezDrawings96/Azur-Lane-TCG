import { createContext, useReducer, useContext } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const FilterContext = createContext();

const filterReducer = (filterState, action) => {
  const { type } = action;
  switch (type) {
    case "toggle-nation": {
      const { value, nation } = action;
      const { nationFilter } = filterState;
      nationFilter[nation] = value;
      return { ...filterState, nationFilter };
    }
    case "toggle-tier": {
      const { value, tier } = action;
      const { tierFilter } = filterState;
      tierFilter[tier] = value;
      return { ...filterState, tierFilter };
    }
    case "toggle-rarity": {
      const { value, rarity } = action;
      const { rarityFilter } = filterState;
      rarityFilter[rarity] = value;
      return { ...filterState, rarityFilter };
    }
    case "toggle-type": {
      const { value, type } = action;
      const { typeFilter } = filterState;
      typeFilter[type] = value;
      return { ...filterState, typeFilter };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const FilterProvider = ({ children }) => {
  const [filterState, setFilterState] = useReducer(filterReducer, {
    nationFilter: {},
    tierFilter: {},
    rarityFilter: {},
    typeFilter: {},
  });

  const value = { filterState, setFilterState };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined)
    throw new Error("filterContext must be used within a Provider");
  return context;
};

export { FilterProvider, useFilter };
