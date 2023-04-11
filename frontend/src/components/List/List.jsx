import React, { useState, useContext } from 'react';
import Dropdown from '../util/Dropdown/Dropdown';
import { MapContext } from '../Context/MapContext';
import './List.css'
import ListItem from './ListItem';

function List() {

    const { filter, filterClear, getNextPlaces, handleFilter, removeAll, sorted, selected, token} = useContext(MapContext);

    const [page, setPage] = useState(1);

    const nextButton = () => {
        setPage(page + 1)
    }

    return (

        <div className="list-container">

            <div className="list-filters-container">

                <Dropdown
                    items={["Highest Rating", "Total Ratings", "Price Level", "A - Z"]}
                    name="rating"
                    placeholder="Filter"
                    filter={filter.rating}
                    handleFilter={handleFilter}
                />

                <Dropdown
                    items={["within 5 miles", "within 10 miles", "within 15 miles", "within 25 miles", "within 50 miles"]}
                    name="miles"
                    placeholder="within 25 miles"
                    filter={filter.miles}
                    handleFilter={handleFilter}

                />

                <Dropdown
                    items={["Cheap", "Moderate", "Expensive", "Priceless"]}
                    name="price"
                    placeholder="Price"
                    filter={filter.price}
                    handleFilter={handleFilter}

                />

                { Object.values(filter).every(value => (value === '')) 
                    ? '' 
                    : 
                        <button
                            type="button"
                            className="list-filter-clear dropdown-btn"
                            onClick={ () => filterClear() }
                        >
                            Clear Filters
                        </button> 
                }

                {selected.length > 0 &&
                    <button 
                        type="button"
                        className="dropdown-btn btn-rmall"
                        onClick={ () => removeAll() }
                    >
                        {`Remove (${selected.length})`}
                    </button>
                }

            </div>

            <div className="list-restaurants-container">
                <div className="list-restaurants">
                    <ul className="retaurant-items">
                        {(typeof sorted != 'undefined') ? (
                            <>
                                {sorted.map((place, index) => {
                                    return(
                                        <ListItem 
                                            key={index}
                                            placeid={place.place_id}
                                            name={place.name}
                                            rating={place.rating}
                                            totalratings={place.user_ratings_total}
                                            pricelevel={place.price_level}
                                            vicinity={place.vicinity}
                                            open={place.opening_hours}
                                       />
                                    )
                                })}
                            </>
                        ) 
                        : ('')}
                    </ul>
                    
                </div>

                

            </div>
            <div className="list-next-container">
                <p>Showing 1-{sorted.length}</p>
                
                <div className="list-next-button">
                    
                    <button 
                        className={`next-button ${(page < 3) ? 'enabled' : 'disabled'}`}
                        onClick={() => {
                            nextButton();
                            getNextPlaces();
                            filterClear();
                        }}
                        disabled={( page < 3 ) ? false : true}
                        >
                        Load More
                    </button>

                </div>
            </div>
        </div>
    )
}

export default List;
