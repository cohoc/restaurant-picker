import React from 'react';
import List from '../components/List/List';
import Map from '../components/Map/Map';
import Selected from '../components/Selected/Selected';

function MapPage() {
    return (
        
        <section className="maps-page">
            <List/>
            <Selected/>
            <Map/>
        </section>
  
    ) 
}

export default MapPage;
