import React, { useContext } from 'react';
import Dropdown from '../util/Dropdown/Dropdown';
import Star from '../../assets/svg/star.svg'
import Dollar from '../../assets/svg/dollar.svg'
import { MapContext } from '../Context/MapContext';
import './List.css'

function List() {

    const { filter, filterClear, handleFilter, mouseHover, mouseLeave, sorted} = useContext(MapContext);

    return (

        <div className="list-container">
            <h2 className="list-header">
                Choose your restaurant
            </h2>

            <p>{filter.rating}</p>
            <p>{filter.miles}</p>
            <p>{filter.price}</p>

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
                                        <li className="place" 
                                            key={index}
                                            onMouseEnter={() => mouseHover(place.place_id)}
                                            onMouseLeave={() => mouseLeave()}
                                            >
                                            <h3 className="place-name">{place.name}</h3>
                                            <div className="place-rating">
                                                <div className="rating-section">
                                                    <p>{place.rating}</p>
                                                    <img
                                                        src={Star}
                                                        alt="staricon"
                                                        id="star-icon"
                                                    />
                                                    <span>&#183;</span>
                                                    <p>({place.user_ratings_total}) reviews</p>
                                                </div>
                                            </div>

                                            <div className="price-section">
                                                <>
                                                    {[...Array(place.price_level)].map( (_, index) => (
                                                        <img 
                                                            key={index}
                                                            src={Dollar}
                                                            alt="dollaricon"
                                                            className="dollar"
                                                            > 
                                                        </img>
                                                    ))}
                                                </>
                                            </div>
                                            
                                            <div className="place-location">
                                                <p>{place.vicinity}</p>
                                            </div>
                                            
                                            { (place.opening_hours)
                                            ?
                                                <div className={place.opening_hours.open_now ? "place-open" : "place-closed"}>
                                                    <p>{place.opening_hours.open_now ? 'Open' : 'Closed'} </p>
                                                </div>
                                            :
                                                <p>Closed</p>
                                            }
                                        </li>
                                    )
                                })}
                            </>
                        ) 
                        : ('')}
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}

export default List;
