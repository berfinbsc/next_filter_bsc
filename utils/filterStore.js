import { create } from 'zustand';

const filterStore = create(set => ({
  selectedFilters: [],

  updateFilter: (category, filter) => 
    set(state => {
    let newSelectedFilters = [...state.selectedFilters]; // Copy state

    const existingCategoryIndex = newSelectedFilters.findIndex(
      (item) => item.category === category
    );

    if (existingCategoryIndex !== -1) {
      // Category exists
      const existingCategory = newSelectedFilters[existingCategoryIndex];

      const filterIndex = existingCategory.filter.findIndex(
        (existingFilter) => existingFilter === filter
      );

      if (filterIndex !== -1) {
        // Filter exists, remove it
        existingCategory.filter.splice(filterIndex, 1);
        // If there are no filters left, remove the category
        if (existingCategory.filter.length === 0) {
          newSelectedFilters.splice(existingCategoryIndex, 1);
        }
      } else {
        // Filter doesn't exist, add it
        existingCategory.filter.push(filter);
      }
    } else {
      // Category doesn't exist, create it with the filter
      newSelectedFilters.push({ category, filter: [filter] });
    }

    return { selectedFilters: newSelectedFilters };
  })
}));

export default filterStore;
