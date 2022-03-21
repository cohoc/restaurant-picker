import React, {useState, useEffect, useRef} from 'react';
import {ReactComponent as Arrow} from '../../../assets/svg/dropdown.svg'
//import {ReactComponent as Cancel} from '../../../assets/svg/cancel.svg'
import './Dropdown.css'

function Dropdown({items, name, placeholder, filter, handleFilter}) {

    const click = useRef();
    const [drop, setDrop] = useState(false);
    const [value, setValue] = useState("");

    const handleChange = (item) => {
        setValue(item);
        handleFilter(name, item)
        setDrop(false);
    }

    const handleClick = (e) => {
        if (click.current.contains(e.target)){
            return;
        }
        else{
            setDrop(false);
        }
    }

    /*const handleClear = () => {
        setDrop(false);
        setValue("");
        handleFilter(name, "clear")
    }*/

    useEffect(() => {
        if(drop) {
            document.addEventListener("mousedown", handleClick);
        }
        else {
            document.removeEventListener("mousedown", handleClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }

    }, [drop]);

    return (
        <div ref={click} className="dropdown-container">
            <button 
                type="button"
                className={(filter !== "") ? "dropdown-btn dropdown-active" : "dropdown-btn dropdown-hidden"}
                onClick={ () => setDrop(!drop) }
                disabled={(filter !== "") ? true : false}
            >
                { filter !== "" ? value : placeholder  }

                <div className={(filter === "") ? "dropdown-icon" : "dropdown-icon is-hidden"}>
                    <Arrow className="dropdown-arrow"/>
                </div>
                
            </button>

            <ul className={ drop ? "dropdown-menu is-open" : "dropdown-menu"}>
                {items.map((item, index) => (
                    <li
                        key={index} 
                        onClick={() => handleChange(item) }
                    >
                        <p>{item}</p>
                    </li>
                ))}
            </ul>

            
        </div>
    )
}

export default Dropdown;
