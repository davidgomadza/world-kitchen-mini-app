
'use client';

import { useState } from 'react';

export default function AddRecipe({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    cookTime: '',
    servings: '',
    category: 'main',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...recipe,
        userHash: user.nullifier_hash,
      }),
    });

    if (response.ok) {
      setIsOpen(false);
      setRecipe({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        cookTime: '',
        servings: '',
        category: 'main',
      });
      // Refresh recipe list
      window.location.reload();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          + Share a Recipe
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">New Recipe</h3>

          <input
            type="text"
            placeholder="Recipe Title"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />

          <textarea
            placeholder="Short description"
            value={recipe.description}
            onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg h-20"
            required
          />

          <textarea
            placeholder="Ingredients (one per line)"
            value={recipe.ingredients}
            onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg h-32"
            required
          />

          <textarea
            placeholder="Instructions"
            value={recipe.instructions}
            onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg h-40"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Cook Time (e.g., 30 min)"
              value={recipe.cookTime}
              onChange={(e) => setRecipe({ ...recipe, cookTime: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Servings"
              value={recipe.servings}
              onChange={(e) => setRecipe({ ...recipe, servings: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <select
            value={recipe.category}
            onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="appetizer">Appetizer</option>
            <option value="main">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="beverage">Beverage</option>
            <option value="snack">Snack</option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg"
            >
              Share Recipe
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 
