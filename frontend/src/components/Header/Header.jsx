import React, { useContext} from 'react';
import {ReactComponent as Search} from '../../assets/svg/search.svg'
import { MapContext } from '../Context/MapContext';

import './Header.css'
import Searchbar from '../Searchbar/Searchbar';

function Header() {

    const {loaded} = useContext(MapContext)

    return (
        <header className="header-container">

            <div className="header-content">
                <h1>Restaurant Picker</h1>
                <div className="searchbar-container">
                    <Search 
                        className="searchbar-icon"
                    />
                    <span className="searchbar-divider"></span>

                    { loaded && <Searchbar /> }
                    
                </div>
            </div>

        </header>
    )
}

export default Header;
