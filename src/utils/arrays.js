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
 * @param {string} input
 * @param {object[]} array
 */
const searchingByInput = (input, array) => {
  if (!input.length) return array;
  const result = [];
  for (const item of array) {
    const { name, description, effectName, serie } = item;
    if (
      (name && name.toLowerCase().indexOf(input) >= 0) ||
      (description && description.toLowerCase().indexOf(input) >= 0) ||
      (effectName && effectName.toLowerCase().indexOf(input) >= 0) ||
      (serie && serie.toLowerCase().indexOf(input) >= 0)
    )
      result.push(item);
  }
  return result;
};

/**
 *
 * @param {object} filters
 * @param {any[]} array
 */
export const applyFilters = (filters, array) => {
  const { nationFilter, rarityFilter, typeFilter, tierFilter, input } = filters;
  // by nation
  const nations = applyingFilter("nation", Object.keys(nationFilter), array);
  // by rarity
  const rarities = applyingFilter("rarity", Object.keys(rarityFilter), nations);
  // by tier
  const tiers = applyingFilter("tier", Object.keys(tierFilter), rarities);
  // by type
  const types = applyingFilter("type", Object.keys(typeFilter), tiers);
  // by input
  const inputs = searchingByInput(input.toLowerCase(), types);
  return inputs;
};
