import { debounce } from "lodash";

export const SearchMeal = ({searchMeal}) => {
    const debouncedSearchMeal = debounce(searchMeal, 300);

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        debouncedSearchMeal(searchTerm);
      };

    return <input className="search-input" placeholder="Search" onChange={handleSearchChange}></input>
}
