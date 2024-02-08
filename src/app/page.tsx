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
      label: string;
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
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, [query, sortBy, sortOrder]);
  const sort = useCallback(() => {
    let sortedRecipes = recipes;
    console.log('sortr =>', sortedRecipes);
    if (sortBy && sortOrder) {
      console.log('sort =>', sortOrder, sortBy);

      sortedRecipes.sort((a, b) => {
        const compareFunction = sortOrder === 'asc' ? 1 : -1;
        if (sortBy === 'protein') {
          return compareFunction * Math.round((b.recipe.digest?.find(item => item.label === 'Protein')?.total || 0)) - Math.round((a.recipe.digest?.find(item => item.label === 'Protein')?.total || 0));
        } else if (sortBy === 'fat') {
          return compareFunction * Math.round((b.recipe.digest?.find(item => item.label === 'Fat')?.total || 0)) - Math.round((a.recipe.digest?.find(item => item.label === 'Fat')?.total || 0));
        } else if (sortBy === 'carbs') {
          return compareFunction * Math.round((b.recipe.digest?.find(item => item.label === 'Carbs')?.total || 0)) - Math.round((a.recipe.digest?.find(item => item.label === 'Carbs')?.total || 0));
        } else if (sortBy === 'totalTime') {
          return compareFunction * Math.round(b.recipe.totalTime - a.recipe.totalTime);
        } else {
          // Default to sorting by totalTime if no valid sortBy is specified
          return 0;
        }
      });

    }
    setRecipes(sortedRecipes)
  }, [sortBy, sortOrder, recipes])
  useEffect(() => { sort() }, [sort])
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
              recipe.recipe.totalTime > 0 && <Card key={recipe.recipe.uri} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
