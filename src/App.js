import './App.css';
import {useEffect, useState, useRef} from 'react';
import React from 'react';

function App() {
  const [ingredientList, updateIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const API_KEY = "c485b20e770fbf9c7f89ad5f5882ce52	";
  const APP_ID = "d0a5e40e";

  const search = () => {
    console.log("input ref", inputRef);
    searchForRecipe(inputRef.current.value);
    inputRef.current.value = "";
  }
  const searchForRecipe = (query) => {
    setLoading(true);
    let url = `search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY} `;
    fetch(url).then(response => {
      console.log(response);
      return response.json();

    }).then(res => {
      console.log("final response", res);
      console.log(res.hits);
      updateIngredientList(res.hits);
      setLoading(false);

    })
    .catch(err => {
      console.log("error", err);
      setLoading(false);
    })

  };
  useEffect(() => {
    searchForRecipe('chicken');


  }, []);
  return (
    <div className="App-header">
      <h3>Recipe app through api.</h3>
      <div className="InputWrapper">
        <input ref={inputRef} placeholder="Search for recipe" />
        <button onClick = {search}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      <div className="Wrapper">
        {ingredientList.map((item) => {
          // const {label, image, ingredientLines} = recipe;

          return(
            <div key={item.recipe.label} className="Ingredient">
              <span>{item.recipe.label}</span>
              <img src={item.recipe.image} />
              <div className ="Steps">
              {item.recipe.ingredientLines.map((step, index) => {
                return <p key={index}>{step }</p>

              })}
              </div>
            </div>
          )

        })}

      </div>

    </div>
  );
}

export default App;
