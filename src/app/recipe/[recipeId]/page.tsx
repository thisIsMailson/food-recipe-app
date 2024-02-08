'use client'
import { useRouter, useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';


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


const RecipePage: React.FC = () => {

    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState<Recipe | null>(null);

    const getRecipe = useCallback(() => {
        const url = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=1cfc7903&app_key=7b4056dc67a4a5f64b2066bcca09c4be`
        recipeId && fetch(url).then((data) => { data.json() }).then((data) => {
            setRecipe(data.hits);
            log('data =>', data);
        }).catch((error) => {
            console.error('Error fetching recipe:', error);
        })
    }, [])
    useEffect(() => {
        getRecipe();
    }, [getRecipe]);
    useEffect(() => {
        console.log('recipe =>', recipe);
    }, [recipe]);
    if (!recipe) {
        return <div>fetching {recipeId}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{recipe.label}</h1>
            <h2 className="text-lg font-semibold mb-2">Ingredients:</h2>
            <ul className="list-disc pl-6 mb-4">
                {/* {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))} */}
            </ul>
            <h2 className="text-lg font-semibold mb-2">Instructions:</h2>
            {/* <p>{recipe.instructions}</p> */}
        </div>
    );
};

export default RecipePage;

