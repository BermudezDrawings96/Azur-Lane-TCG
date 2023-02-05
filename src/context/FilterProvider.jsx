import { createContext, useReducer, useContext } from "react";

// utils
import { applyFilters } from "../utils/arrays";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const FilterContext = createContext();

const filterReducer = (filterState, action) => {
  const { type } = action;
  switch (type) {
    case "set-result": {
      const { array } = action;
      return { ...filterState, result: array, original: [...array] };
    }
    case "toggle-nation": {
      const { value, nation } = action;
      const { nationFilter, original } = filterState;
      nationFilter[nation] = value;
      if (!nationFilter[nation]) delete nationFilter[nation];
      const result = applyFilters({ ...filterState, nationFilter }, original);
      return { ...filterState, nationFilter, result };
    }
    case "toggle-tier": {
      const { value, tier } = action;
      const { tierFilter, original } = filterState;
      tierFilter[tier] = value;
      if (!tierFilter[tier]) delete tierFilter[tier];
      const result = applyFilters({ ...filterState, tierFilter }, original);
      return { ...filterState, tierFilter, result };
    }
    case "toggle-rarity": {
      const { value, rarity } = action;
      const { rarityFilter, original } = filterState;
      rarityFilter[rarity] = value;
      if (!rarityFilter[rarity]) delete rarityFilter[rarity];
      const result = applyFilters({ ...filterState, rarityFilter }, original);
      return { ...filterState, rarityFilter, result };
    }
    case "toggle-type": {
      const { value, cal } = action;
      const { typeFilter, original } = filterState;
      typeFilter[cal] = value;
      if (!typeFilter[cal]) delete typeFilter[cal];
      const result = applyFilters({ ...filterState, typeFilter }, original);
      return { ...filterState, typeFilter, result };
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
    result: [],
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
