import './styles/styles.scss';
import { MealsPage } from './pages/meals-page';
import { Provider } from 'react-redux';
import  store  from './store/store';

function App() {
  return (
    <Provider store={store}>
    <div className="recipes-page">
      <MealsPage></MealsPage>
    </div>
    </Provider>
  );
}

export default App;
