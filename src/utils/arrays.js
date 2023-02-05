// @ts-check

/**
 *
 * @param {string} attribute
 * @param {string[]} filter
 * @param {object[]} array
 * @returns
 */
const applyingFilter = (attribute, filter, array) => {
  if (!filter.length) return array;
  const result = [];
  for (const toCompare of filter) {
    const filtered = array.filter(
      (item) => String(item[attribute]) === toCompare
    );
    for (const filteredItem of filtered) result.push(filteredItem);
  }
  return result;
};

/**
 *
 * @param {object} filters
 * @param {any[]} array
 */
export const applyFilters = (filters, array) => {
  const { nationFilter, rarityFilter, typeFilter, tierFilter } = filters;
  if (
    !Object.keys(nationFilter).length &&
    !Object.keys(rarityFilter).length &&
    !Object.keys(typeFilter).length &&
    !Object.keys(tierFilter).length
  )
    return array;
  console.log(nationFilter, rarityFilter, typeFilter, tierFilter);
  // by nation
  const nations = applyingFilter("nation", Object.keys(nationFilter), array);
  // by rarity
  const rarities = applyingFilter("rarity", Object.keys(rarityFilter), nations);
  // by tier
  const tiers = applyingFilter("tier", Object.keys(tierFilter), rarities);
  // by type
  const types = applyingFilter("type", Object.keys(typeFilter), tiers);
  return types;
};
