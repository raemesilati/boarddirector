const searchByName = async (searchTerm) => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchTerm);
        if (!response.ok) {
            throw new Error('Failed to fetch meal data');
        }

        const data = await response.json();
        return data.meals;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default searchByName;