
const getMeal = async (id) => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
        if (!response.ok) {
            throw new Error('Failed to fetch meal data');
        }

        const data = await response.json();
        return data.meals[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

export default getMeal;