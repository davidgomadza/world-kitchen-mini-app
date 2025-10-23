
'use client';

import { useEffect, useState } from 'react';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading recipes...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Recipe Feed</h2>

      {recipes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No recipes yet. Be the first to share!
        </div>
      ) : (
        recipes.map((recipe: any, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
                <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mt-1">
                  {recipe.category}
                </span>
              </div>
              <span className="text-2xl">{getCategoryEmoji(recipe.category)}</span>
            </div>

            <p className="text-gray-600 mb-4">{recipe.description}</p>

            <div className="flex gap-4 text-sm text-gray-500 mb-4">
              <span>⏱️ {recipe.cookTime}</span>
              <span>🍽️ {recipe.servings} servings</span>
            </div>

            <details className="mb-3">
              <summary className="font-semibold cursor-pointer text-orange-600">
                Ingredients
              </summary>
              <ul className="mt-2 space-y-1 text-gray-700">
                {recipe.ingredients.split('\n').map((ingredient: string, i: number) => (
                  <li key={i} className="ml-4">• {ingredient}</li>
                ))}
              </ul>
            </details>

            <details>
              <summary className="font-semibold cursor-pointer text-orange-600">
                Instructions
              </summary>
              <p className="mt-2 text-gray-700 whitespace-pre-line">
                {recipe.instructions}
              </p>
            </details>

            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-500">✓ Verified Chef</span>
              <div className="flex gap-2">
                <button className="text-sm text-orange-600 hover:text-orange-700">
                  ❤️ Save
                </button>
                <button className="text-sm text-orange-600 hover:text-orange-700">
                  Share
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function getCategoryEmoji(category: string) {
  const emojis: Record<string, string> = {
    appetizer: '🥗',
    main: '🍽️',
    dessert: '🍰',
    beverage: '🥤',
    snack: '🍿',
  };
  return emojis[category] || '🍴';
} 
