import { useState, useEffect } from 'react';
import './App.css';
import ForecastCards from './ForecastCards';
import { getWeatherData, getForecastData } from './weatherApiHelpers';
import Swal from 'sweetalert2';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [showForecast, setShowForecast] = useState(false); 
  const [searchPerformed, setSearchPerformed] = useState(false); 

  useEffect(() => {
    if (city) {
      getForecastData(city)
        .then((data) => setForecast(data))
        .catch((error) => console.log(error));
    }
  }, [city]);

  const handleSearch = () => {
    if (!city.trim()) {
      Swal.fire("Por favor, ingrese la ciudad.");
      return;
    }

    getWeatherData(city)
      .then((data) => {
        if (data.cod && data.cod === '404') {
          setWeather(null);
          alert('Ciudad no encontrada. Por favor ingrese un nombre de ciudad válida.');
          window.location.reload();
        } else {
          setWeather(data);
          setShowForecast(false); 
          setSearchPerformed(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setWeather(null);
        Swal.fire("A ocurrido un error. Por favor intente más tarde.");
        window.location.reload();
      });
  };

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>My <i>Weather App</i></h3>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter city name"
          onBlur={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>
      {weather && (
        <div style={styles.weatherContainer}>
          <h2 style={styles.weatherHeading}>Weather in: {weather.name}</h2>
          <h3 style={styles.temperature}>{weather.main.temp}°C</h3>
          <h4 style={styles.weatherDescription}>{weather.weather[0].description}</h4>
          {weather.weather[0].icon && (
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="Weather Icon"
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </div>
      )}
      {searchPerformed && ( 
        <button onClick={toggleForecast} style={styles.button}>
          {showForecast ? 'Hide Forecast' : 'Show Forecast'}
        </button>
      )}
      {showForecast && (
        <div>
          <hr style={styles.hr} />
          <div style={styles.forecastContainer}>
            {forecast && <ForecastCards forecastList={createForecastList(forecast.list)} />}
          </div>
        </div>
      )}
    </div>
  );
}

// Function to group forecasts by day
const createForecastList = (forecastList) => {
  const groupedForecast = [];
  for (let i = 0; i < forecastList.length; i += 8) {
    groupedForecast.push(forecastList.slice(i, i + 8));
    console.log(groupedForecast);
  }
  return groupedForecast;
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    marginRight: '10px',
  },
  button: {
    padding: '8px 16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
  },
  weatherContainer: {
    margin: '20px 0',
  },
  weatherHeading: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  temperature: {
    fontSize: '32px',
    margin: '10px 0',
  },
  weatherDescription: {
    fontSize: '18px',
    color: '#555',
  },
  hr: {
    border: '1px solid #ddd',
    margin: '20px 0',
  },
  forecastContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

// The rest of your code...

export default App;