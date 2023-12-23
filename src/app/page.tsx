'use client'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import Card from './components/Card'
import HeroCarousel from './components/Hero';
import RecipeFilter from './components/RecipeFilter';
import { debounce } from 'lodash';
import useFilters from './utils/useFilter';
type Recipe = {
  recipe: {
    uri: string;
    label: string;
    images: {
      REGULAR: {
        url: string;
      };
    };
    digest: {
      total: number;
    }[];
    totalTime: number;

  };
  _links: {
    self: {
      href: string;
    };
  };

};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState('pasta');

  const { sortBy, sortOrder, handleSort } = useFilters();
  const getRecipes = useCallback(() => {
    query && fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=1cfc7903&app_key=7b4056dc67a4a5f64b2066bcca09c4be`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.hits);
        // Sort recipes based on sortBy and sortOrder
        let sortedRecipes = [...data.hits];
        if (sortBy && sortOrder) {
          sortedRecipes.sort((a, b) => {
            // Implement sorting logic based on sortBy and sortOrder
            if (sortOrder === 'asc') {
              return a[sortBy] - b[sortBy];
            } else if (sortOrder === 'desc') {
              return b[sortBy] - a[sortBy];
            }
            return 0;
          });
        }

        // Update recipes state with sorted recipes
        setRecipes(sortedRecipes);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, [query]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const debouncedHandleSearch = debounce((searchTerm: string) => {
    setQuery(searchTerm);
  }, 500);

  const handleSearch = (searchTerm: string) => {
    debouncedHandleSearch(searchTerm);
  };

  return (
    <main>
      <div className='mb-8'>
        <HeroCarousel />
      </div>
      <div className='mb-4'>
        <RecipeFilter onSearch={(e: string) => handleSearch(e)} onSort={(e: string, s: string) => handleSort(e, s)} />
      </div>
      {recipes && (
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              recipe.recipe.totalTime > 0 && < Card key={recipe.recipe.uri} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
