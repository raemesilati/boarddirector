import { useState, useEffect } from "react"
import { SearchMeal } from "../components/searchMeal";
import getMeal from './../services/getMeal';
import { MealPreview } from "../components/mealPreview";
import { MultiSelect } from './../components/multiSelect';
import getMealsByCategories from './../services/getMealsByCategories';
import { MealsTab } from "../components/tab";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import searchByName from "../services/searchName";
import { TabsHeaders } from "../components/tabs-headers";
import { ActionTypes } from './../store/mealActions.enum';

export const TabsPage = ({ dispatch }) => {
  const [selectedMeal, setSelectedMeal] = useState({});
  const [tab, setTab] = useState(0);
  const meals = useSelector((state) => state.meals);
  const favorites = useSelector((state) => state.favorites);
  const categories = useSelector((state) => state.categories);
  const itemToShow = 10;
  const [start, setStart] = useState(0);
  const [visibleMeals, setVisibleMeals] = useState([]);

  const handleMultiSelectChange = async (selectedValues) => {
    try {
      const mealPromises = selectedValues.map(async (element) => {
        return await getMealsByCategories(element);
      });

      const mealsData = await Promise.all(mealPromises);
      const meals = mealsData.flat().sort((mealA, mealB) => mealA.idMeal.localeCompare(mealB.idMeal))
      dispatch({
        type: ActionTypes.FETCH_MEALS_SUCCESS,
        payload: meals,
      });
      setStart(0)
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const localMeals = tab === 0 ? meals?.length > 0 ?
      [...meals].slice(start, start + itemToShow) : []
      : favorites?.length > 0 ?
        [...favorites].slice(start, start + itemToShow) : [];
    setVisibleMeals(localMeals)
  }, [meals, start, tab, favorites])


  const searchMeal = async (term) => {
    setStart(0)
    const mealData = await searchByName(term);
    dispatch({
      type: ActionTypes.FETCH_MEALS_SUCCESS,
      payload: mealData,
    });
  }

  const selectMeal = async (id) => {
    if (String(id).length === 13) return setSelectedMeal(meals.find(x => x.idMeal === id))
    let getMealData = await getMeal(id)
    setSelectedMeal(getMealData)
  }

  const closePreview = () => {
    setSelectedMeal({})
  }

  const handleFavorite = (meal) => {
    dispatch({
      type: ActionTypes.TOGGLE_FAVORITE,
      payload: meal
    })
  }

  const handleTab = (num) => {
    setStart(0)
    setTab(num)
  }

  const nextPage = () => {
    setStart(start + itemToShow);
  }

  const prevPage = () => {
    setStart(start - itemToShow);
  }

  return <div>
    <h1>Recipes</h1>
    <MealPreview meal={selectedMeal} closePreview={closePreview} />
    <div className="filter-inputs">
      {searchMeal && <SearchMeal searchMeal={searchMeal} />}
      {categories && <MultiSelect categories={categories} onChange={handleMultiSelectChange} />}
      <Link to="/new-meal">Add Recipe</Link>
    </div>

    <TabsHeaders tab={tab} handleTab={handleTab}></TabsHeaders>
    {tab === 0 && <MealsTab
      meals={meals}
      favorites={favorites}
      visibleMeals={visibleMeals}
      selectMeal={selectMeal}
      handleFavorite={handleFavorite}
      start={start} nextPage={nextPage}
      prevPage={prevPage}
    />}
    {tab === 1 && <MealsTab
      meals={favorites}
      favorites={favorites}
      visibleMeals={visibleMeals}
      selectMeal={selectMeal}
      handleFavorite={handleFavorite}
      start={start} nextPage={nextPage}
      prevPage={prevPage}
    />}

  </div>
}
