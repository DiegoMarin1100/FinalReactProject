import { useState,useEffect } from 'react'
import './App.css'

//* Componentizar la aplicacion (por ejemplo un componente para las tarjetas de pronostico)
//* agregar estilos con cualquier metodologia (css, styled components,o frameworks tailwind chakra etc)
//* sacar la logica de las consultas a las api a un archivo aparte como helpers o customHooks
//* la idea es hacer la aplicacion mas escalable y mantenible, que sea facil de agregar nuevas funcionalidades, 
// y que sea facil de leer y entender el codigo
// y mas bonita visualmente

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const APIKEY = 'b8e76533d49342768241dd6ce39ca8e7'

  //fUNCION PARA OBTENER EL CLIMA ACTUAL
  const getWeather = () =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.log(error))
  }

  //fUNCION PARA OBTENER EL PRONOSTICO DEL CLIMA A 5 DIAS CADA 3 HORAS
  const getForecast = () =>{
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=metric`)
      .then((response) => response.json())
      .then((data) => setForecast(data))
      .catch((error) => console.log(error))
  }
 
  useEffect(() => {
      if(city){
        getForecast()
      }
  }, [city])

  console.log(weather)
  console.log(forecast)

  return (
    <div>
      <h1>My Weather App</h1>
      <div>
        <input 
          type="text" 
          placeholder="Enter city name"
          onBlur={(e) => setCity(e.target.value)}//onBlur es un evento que se ejecuta cuando el usuario sale del input
        />
        <button
          onClick={getWeather}
        >
          Search
        </button>
        {weather && (
          <div>
            <h2>Weather in: {weather.name}</h2>
            <h3>{weather.main.temp}°C</h3>
            <h4>{weather.weather[0].description}</h4>
          </div>
        )}
        <hr />
        <div>
          {forecast && (
            <>
              <h2>Forecast</h2>
              <div className='container'>
                <div className='card'>
                  {forecast.list.slice(0,8).map((item,index)=>(
                    <div key={index} className="iner">
                      <h3>{item.dt_txt}</h3>
                      <h4>{item.main.temp}°C</h4>
                    </div>
                  ))}
                </div>
                <div className='card'>
                  {forecast.list.slice(8,16).map((item,index)=>(
                    <div key={index} className="iner">
                      <h3>{item.dt_txt}</h3>
                      <h4>{item.main.temp}°C</h4>
                    </div>
                  ))}
                </div>
                <div className='card'>
                  {forecast.list.slice(16,24).map((item,index)=>(
                    <div key={index} className="iner">
                      <h3>{item.dt_txt}</h3>
                      <h4>{item.main.temp}°C</h4>
                    </div>
                  ))}
                </div>
                <div className='card'>
                  {forecast.list.slice(24,32).map((item,index)=>(
                    <div key={index} className="iner">
                      <h3>{item.dt_txt}</h3>
                      <h4>{item.main.temp}°C</h4>
                    </div>
                  ))}
                </div>
                <div className='card'>
                  {forecast.list.slice(32,40).map((item,index)=>(
                    <div key={index} className="iner">
                      <h3>{item.dt_txt}</h3>
                      <h4>{item.main.temp}°C</h4>
                </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default App
