import './ForecastCards.css';

const ForecastCards = ({ forecastList }) => {
  return (
    <div className='forecast-container'>
      <h2>Forecast</h2>
      <div className='card-container'>
        {forecastList.map((dayForecast, cardIndex) => (
          <div key={cardIndex} className='forecast-card'>
            {dayForecast.map((item, index) => (
              <div key={index} className='inner'>
                <h3 style={{ color: 'blue' }}>{item.dt_txt}</h3>
                <h4>{item.main.temp}°C</h4>
                <h4>{item.weather[0].description}</h4>
                {item.weather[0].icon && (
                  <img
                    src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt='Weather Icon'
                    className='weather-icon'
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCards;