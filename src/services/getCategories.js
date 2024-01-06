
const getCategories = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if (!response.ok) {
            throw new Error('Failed to fetch meal data');
        }

        const data = await response.json();
        return data.categories;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default getCategories;