
const getMealsByCategories = async (category) => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + category);
        if (!response.ok) {
            throw new Error('Failed to fetch meal data');
        }
        const data = await response.json();
        return data.meals;

    } catch (error) {
        throw new Error(error.message);
    }
};

export default getMealsByCategories;