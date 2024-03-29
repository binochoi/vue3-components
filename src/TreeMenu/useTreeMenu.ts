import type { MenuItem } from './types';

export const useTreeMenu = () => {
  const useFiltering = () => {
    const filterSearchedItem = (searchText: string) => (item: MenuItem) => {
      const excludedSearchTextFromLabel = item.label && searchText && !item.label.toLowerCase().includes(searchText.toLowerCase());
      if (item.label === undefined || excludedSearchTextFromLabel) return false;
      return true;
    };
    const recursiveFilterItem = (searchText: string) => (item: MenuItem): MenuItem | null => {
      const children = item.children?.map(recursiveFilterItem(searchText)).filter((item): item is MenuItem => item !== null);
      const isSearchedItem = filterSearchedItem(searchText)(item) || children?.length;
      if (!isSearchedItem) {
        return null;
      }
      return {
        ...item,
        children,
      };
    };
    const getSearchedItems = (items: MenuItem[], searchText: string) => items.map(recursiveFilterItem(searchText)).filter((item): item is MenuItem => item !== null);
    return {
      getSearchedItems,
    };
  };
  return {
    useFiltering,
  };
};
