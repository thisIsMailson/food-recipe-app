// Card.js

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Recipe = {
    recipe: {
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

const ClockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6 inline-block mr-1 text-gray-600"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6l3 3m6-3a9.003 9.003 0 01-9 9 9.003 9.003 0 01-9-9 9.003 9.003 0 019-9 9.003 9.003 0 019 9z"
        ></path>
    </svg>
);
const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={filled ? 'red' : 'white'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        ></path>
    </svg>
);
const Card = ({ recipe }: { recipe: Recipe }) => {

    const [fooId, setFooId] = useState<string>('');
    const { recipe: recipeData, _links } = recipe;
    const { label, images, digest, totalTime } = recipeData;
    const { href } = _links.self;
    var regex = /\/([a-f0-9]{32})\?/;
    var match = href.match(regex);
    if (match && match[1] !== fooId)
        setFooId(match[1]);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToFavorites = (id: string) => {
        onAddToFavorites(id);
        setIsFavorite(!isFavorite);
    };
    const onAddToFavorites = (recipe: string) => {
        const favorites = localStorage.getItem('favorites');
        if (favorites) {
            const favoritesArray = JSON.parse(favorites);
            favoritesArray.push(recipe);
            localStorage.setItem('favorites', JSON.stringify(favoritesArray));
        } else {
            localStorage.setItem('favorites', JSON.stringify([recipe]));
        }
    }
    return fooId && <>
        <div className="max-w-xs rounded overflow-hidden shadow-lg mx-auto transition duration-300 transform hover:scale-105 relative">
            <Link href={`/recipe/${fooId}`} legacyBehavior passHref>
                <a className="block">
                    <Image
                        src={images?.REGULAR?.url}
                        alt={label}
                        width={200}
                        height={200}
                        className="w-full h-40 object-cover"
                    />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 transition duration-300 hover:underline-hover">
                            {label}
                        </div>
                        <p className="text-gray-700 text-base">
                            Fat: {Math.round(digest[0].total)}g | Carbs: {Math.round(digest[1].total)}g | Protein: {Math.round(digest[2].total)}g
                        </p>
                        <div className="flex items-center text-gray-700 text-base">
                            <ClockIcon />
                            <p>{totalTime} mins</p>
                        </div>
                    </div>
                </a>
            </Link>
            <button
                onClick={() => handleAddToFavorites(fooId)}
                className="absolute top-2 right-2 cursor-pointer focus:outline-none"
            >
                <HeartIcon filled={isFavorite} />
            </button>
        </div>
    </>
    // <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    //     <Image
    //         src={images?.REGULAR?.url}
    //         alt={label}
    //         width={'200'}
    //         height={'200'}

    //         className="w-full h-40 object-cover"
    //     />
    //     <div className="px-6 py-4">
    //         <div className="font-bold text-xl mb-2">{label}</div>
    //         <div className="flex justify-between text-sm">
    //             <span>Fat: {Math.round(digest[0]?.total)}g</span>
    //             <span>Carbs: {Math.round(digest[1]?.total)}g</span>
    //             <span>Protein: {Math.round(digest[2]?.total)}g</span>
    //             <span>Total Time: {totalTime} mins</span>
    //         </div>
    //     </div>
    //     {<div className="px-6 py-4">
    //         <Link href={`/recipe/`} legacyBehavior passHref>
    //             <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
    //                 View Recipe
    //             </a>
    //         </Link>
    //     </div>}
    // </div>

};

export default Card;
