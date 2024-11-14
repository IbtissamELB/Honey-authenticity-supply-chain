import React, { useState } from 'react';

function Search({ onSearch }) {
    const [criteria, setCriteria] = useState("");

    const handleSearch = () => {
        onSearch(criteria);
    };

    return (
        <div>
            <h2>Search Products</h2>
            <input
                type="text"
                placeholder="Enter search criteria"
                onChange={(e) => setCriteria(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Search;
