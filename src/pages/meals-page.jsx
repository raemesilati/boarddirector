import { TabsPage } from './tabsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NewMealPage } from './new-meal';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import getCategories from './../services/getCategories';
import searchByName from '../services/searchName';
import { ActionTypes } from './../store/mealActions.enum';

export const MealsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMeals()
    getCategoriesData();
  }, [dispatch]);


  const getCategoriesData = async () => {
    const categoriesData = await getCategories();
    dispatch({
      type: ActionTypes.FETCH_CATEGORIES_SUCCESS,
      payload: categoriesData
    })
  }

  const fetchMeals = async () => {
    const mealData = await searchByName("");
    dispatch({
      type: ActionTypes.FETCH_MEALS_SUCCESS,
      payload: mealData,
    });
  }


  return (
    <div className="meals">
      <Router>
        <Routes>
          <Route path="/" element={<TabsPage dispatch={dispatch} />} />
          <Route path="/new-meal" element={<NewMealPage dispatch={dispatch} />} />
        </Routes>
      </Router>
    </div>
  );
};
