import React, { useState, useContext } from 'react';
import Dropdown from '../util/Dropdown/Dropdown';
import { MapContext } from '../Context/MapContext';
import './List.css'
import ListItem from './ListItem';

function List() {

    const { filter, filterClear, handleFilter, sorted} = useContext(MapContext);

    const [page, setPage] = useState(1);

    const nextButton = () => {
        setPage(page + 1)
    }

    const prevButton = () => {
        setPage(page - 1)
    }

    return (

        <div className="list-container">
            <h2 className="list-header">
                Choose your restaurant
            </h2>

            <div className="list-filters-container">

                <Dropdown
                    items={["Highest Rating", "Total Ratings", "Price Level", "Open Now"]}
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
            <div className="list-page-container">
                <p>Showing 1-20</p>
                <p>{page}</p>
                <div className="list-page-buttons">
                    <button 
                        className="page-button" 
                        onClick={prevButton}
                        disabled={(page > 1) ? false : true}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className={(page > 1) ? "button-icon" : "button-icon btn-disabled"} viewBox="0 0 512 512">
                            <path d="M213.7 256 380.9 81.9c4.2-4.3 4.1-11.4-.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-.2L131.1 247.9c-2.2 2.2-3.2 5.2-3 8.1-.1 3 .9 5.9 3 8.1l204.2 212.7c4.2 4.3 11.2 4.2 15.5-.2l29.9-30.6c4.3-4.4 4.4-11.5.2-15.8L213.7 256z"/>
                        </svg>
                    </button>

                    <button 
                        className="page-button "
                        onClick={nextButton}
                        disabled={(page < 3) ? false : true}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className={(page < 3 ) ? "button-icon" : "button-icon btn-disabled"} viewBox="0 0 512 512">
                            <path d="M298.3 256 131.1 81.9c-4.2-4.3-4.1-11.4.2-15.8l29.9-30.6c4.3-4.4 11.3-4.5 15.5-.2L380.9 248c2.2 2.2 3.2 5.2 3 8.1.1 3-.9 5.9-3 8.1L176.7 476.8c-4.2 4.3-11.2 4.2-15.5-.2L131.3 446c-4.3-4.4-4.4-11.5-.2-15.8L298.3 256z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default List;
