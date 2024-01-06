import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { ActionTypes } from './mealActions.enum';

// Initial state
const initialState = {
  meals: [],
  categories: [],
  favorites: [],
};

// Reducer
const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MEALS_SUCCESS:
      return {
        ...state,
        meals: action.payload,
      };

    case ActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.map(x => {
          return {
            ...x,
            id: x.strCategory,
            value: x.strCategory
          }
        }),
      };

    case ActionTypes.ADD_NEW_MEAL:
      return {
        ...state,
        meals: [action.payload, ...state.meals,],
      };

    case ActionTypes.TOGGLE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.find(x => x === action.payload) ?
          state.favorites.filter(meal => meal !== action.payload)
          : [...state.favorites, action.payload],
      };

    default:
      return state;
  }
};

const store = createStore(mealReducer, applyMiddleware(thunk));

export default store;
