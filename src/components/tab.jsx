
import { MealCard } from "./mealCard"
import { Pagination } from "./pagination";

export const MealsTab = ({ meals, visibleMeals, selectMeal, handleFavorite, favorites, nextPage, prevPage, start }) => {
    return <div>
        <ul className="meal-cards">
            {visibleMeals?.length > 0 && visibleMeals.map(meal => <MealCard key={meal.idMeal} meal={meal} selectMeal={selectMeal} addFavorite={handleFavorite} favorites={favorites} />)}
        </ul>
        {meals.length === 0 ? <p>
            No Items Were Found :(
        </p> : null}
        {meals?.length > 0 && <Pagination data={meals} nextPage={nextPage} prevPage={prevPage} start={start}></Pagination>}
    </div>
}