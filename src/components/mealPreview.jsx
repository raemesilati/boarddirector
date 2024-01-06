export const MealPreview = ({ meal, closePreview }) => {
    return <div className={meal.strMeal ? "meal-preview" : "meal-preview hide"}>
        <div className="preview-window">
            <button onClick={() => closePreview()} className="close-preview">X</button>
            <div className="meal-header">
                <div className="img-conainer">
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                </div>
                <div className="meal-info">
                    <h3>{meal.strMeal}</h3>
                    <h4>{meal.strCategory}</h4>
                    <h5>Ingredients</h5>
                    <ul>
                        {Object.keys(meal).map((key, index) => {
                            if (key.includes("strIngredient") && meal[key]) {
                                return (
                                    <li key={index}>
                                        {meal[key]} {meal["strMeasure" + key.replace("strIngredient", "")]}
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            </div>
            <div className="meal-body">
                <h5>Instructions</h5>
                <p>
                    {meal.strInstructions}
                </p>
            </div>
        </div>
    </div>


}