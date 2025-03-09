import React, { useState } from 'react';
import axios from 'axios';
import './Recipe.css'; // Import CSS file for styling

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('https://api.edamam.com/search', {
        params: {
          q: query,
          app_id: '1227ed26',
          app_key: '58d3b3c314113d3823126996b5a7f840',
        },
      });
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='recipe'>
      <h1 style={{ color: '#f57418' }}>Fit, Flavorful Feasts</h1>
      <form className="rsearch" onSubmit={handleSubmit}>
        <div className="rsearch">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={query}
            onChange={handleChange}
            className="rsearchbar"
          />
          <button type="submit" className="rsearch_button">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <a
            className="recipe-card"
            href={recipe.recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <div>
              <h3>{recipe.recipe.label}</h3>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <p>Calories: {recipe.recipe.calories.toFixed(2)}</p>
              <p>Ingredients: {recipe.recipe.ingredients.length}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
