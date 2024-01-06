export const MealCard = ({ meal, selectMeal, addFavorite, favorites }) => {

    return <li className="meal-card">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="meal-info">
            <div className="card-title">
                <h3>{meal.strMeal}</h3>
                <button className="favorite-button">
                    <img src={favorites.find(x => x.idMeal === meal.idMeal) ? "/images/star-filled.svg" : "/images/star.svg"} alt="star" onClick={() => addFavorite(meal)} />
                </button>
            </div>
            <h4>{meal.strCategory}</h4>
            <p>{meal.strInstructions}</p>
            <button onClick={() => selectMeal(meal.idMeal)}>
                Read More
            </button>
        </div>

    </li>
}