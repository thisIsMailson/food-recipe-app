import { useState } from 'react';

const useFilters = () => {
    const [sortBy, setSortBy] = useState<string>('protein_asc');
    const [sortOrder, setSortOrder] = useState<string>('');

    const handleSort = (sortByField: string, sortOrderType: string) => {
        console.log('sorting =>', sortByField, sortOrderType);
        setSortBy(sortByField);
        setSortOrder(sortOrderType);
    };

    // Add other filter-related functions and state as needed

    return {
        sortBy,
        sortOrder,
        handleSort,
        // Add other filter-related state and functions here
    };
};

export default useFilters;
