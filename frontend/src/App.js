import './App.css';
import { MapProvider } from './components/Context/MapContext';
import Header from './components/Header/Header';
import MapPage from './pages/MapPage';

function App() {
  return (
    <div className="font-themes color-themes misc font-sizes">
      <MapProvider>
        <Header/>
        <MapPage/> 
      </MapProvider> 
    </div>
  );
}

export default App;
