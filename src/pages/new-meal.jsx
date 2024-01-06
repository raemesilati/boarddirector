import { useState } from 'react';
import Input from './../components/input';
import Select from '../components/select';
import TextArea from '../components/text-area';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ActionTypes } from './../store/mealActions.enum';

export const NewMealPage = ({ dispatch }) => {
    const categories = useSelector(state => state.categories);
    const [form, setForm] = useState({
        name: "",
        category: "",
        image: "",
        instructures: "",
        ingredients: [""]
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let suitableMealObj = {
            idMeal: Date.now(),
            strMeal: form.name,
            strCategory: form.category,
            strMealThumb: form.image,
            strInstructions: form.instructures
        }
        form.ingredients.forEach((ele, index) => {
            if (ele) {
                suitableMealObj["strIngredient" + (index + 1)] = ele
            }
        })
        await dispatch({
            type: ActionTypes.ADD_NEW_MEAL,
            payload: suitableMealObj
        })
        navigate('/')
    }

    const addIngredient = () => {
        let localForm = { ...form };
        form.ingredients.push("")
        setForm((form) => ({
            ...form,
            localForm
        }))
    }

    const deleteIngredient = (index) => {
        let localForm = { ...form };
        form.ingredients.splice(index, 1)
        setForm((form) => ({
            ...form,
            localForm
        }))
    }

    const onValueChange = ({ currentTarget: input }) => {
        let localForm = form;
        localForm[input.name] = input.value;
        if (input.name.includes('ingredient')) {
            let ingredientIndex = parseInt(input.name.replace("ingredient", ""))
            form.ingredients[ingredientIndex] = input.value
        }
        setForm((form) => ({
            ...form,
            localForm
        }))
    }


    return <div className="new-page">
        <Link to="/">
            <img src="/images/arrow.svg" alt="back" />
            Back
        </Link>
        <h1>Add Recipe</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className='inputs-container'>
                <Input
                    name={"name"}
                    placeholder={'Meal Name'}
                    onChange={onValueChange}
                    value={form.name}
                    required={true}
                />
                <Select
                    name={"category"}
                    placeholder={'Category'}
                    onChange={onValueChange}
                    value={form.category}
                    options={categories}
                    required={true}
                />
                <Input
                    name={"image"}
                    placeholder={'Image URL'}
                    onChange={onValueChange}
                    value={form.image}
                    required={true}
                />
                {form.ingredients.map((ingredient, index) =>
                    <div className='ingredient' key={index}>
                        <Input
                            name={"ingredient" + index}
                            placeholder={'Ingredient'}
                            onChange={onValueChange}
                            value={ingredient}
                            required={true}
                        />
                        {index !== form.ingredients.length - 1 ?
                            <input type="button" onClick={() => deleteIngredient(index)} value="-" /> :
                            <input type="button" onClick={addIngredient} value="+" disabled={form.ingredients.length > 20} />}
                    </div>
                )}

            </div>
            <div className='textarea-container'>
                <TextArea
                    name={"instructures"}
                    placeholder={"instructures"}
                    value={form.instructures}
                    onChange={onValueChange}
                />
            </div>
            <div className='actions-container'>
                <input type="submit" value="Submit" />
            </div>
        </form>
    </div>
}