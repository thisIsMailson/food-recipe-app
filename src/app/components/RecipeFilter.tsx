// RecipeFilter.jsx
import React, { ChangeEvent } from 'react';

const RecipeFilter = ({ onSearch, onSort }: { onSearch: (searchTerm: string) => void, onSort: (sortBy: string, sortOrder: string) => void }) => {
    const handleSearch = (searchTerm: ChangeEvent<HTMLInputElement>) => {
        console.log('searching1 =>', searchTerm.target.value);
        onSearch(searchTerm.target.value);
    };

    const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
        const sortOption = event.target.value;;
        const [sortBy, sortOrder] = sortOption.split('_');
        onSort(sortBy, sortOrder);
    };
    const searchKeys = [{ 'protein_asc': 'Protein (Asc)' }, { 'protein_desc': 'Protein (Desc)' }, { 'fat_asc': 'Fat (Asc)' }, { 'fat_desc': 'Fat (Desc)' }, { 'carbs_asc': 'Carbs (Asc)' }, { 'carbs_desc': 'Carbs (Desc)' }, { 'totalDuration_asc': 'Total Duration (Asc)' }, { 'totalDuration_desc': 'Total Duration (Desc)' }]

    return (
        <div className="flex items-center justify-between p-4 bg-green-200 text-brown-800">
            <div>
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search recipes..."
                    onChange={(e) => handleSearch(e)}
                    className="p-2 mr-2 border rounded"
                />
            </div>
            <div>
                {/* Sorting Filter */}
                <select onChange={handleSort} className="p-2 border rounded">
                    {searchKeys.map((key, index) => {
                        return <option key={index} value={Object.keys(key)[0]}>{Object.values(key)[0]}</option>
                    }
                    )}
                </select>
            </div>
        </div>
    );
};

export default RecipeFilter;
