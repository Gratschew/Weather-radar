import HourlyWeatherCard from "./HourlyWeatherCard";

const CityWeather = ( {name, weatherList} ) => {

  let weatherListCopy = [...weatherList[0]];

  // closest weather to current time
  const currWeather = weatherListCopy[0];

  // remove the current weather from the future forecast
  weatherListCopy = weatherListCopy.slice(1);

  const iconUrl = "http://openweathermap.org/img/wn/" + currWeather.weatherIcon + "@2x.png"

  // calculates the hybrid contractions of a numeral and a word
  const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
  
  // format the parts of a date
  const date = new Date(currWeather.time);
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const timeWithoutSecond = date.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'});
  const day = date.getDate().toString() + nth(date.getDate());
  
  return (
  <div className = 'weatherForCity'>
    <div className = 'card'>
      <div className = 'location'>
        <div className = 'name'>{name}</div>

        {/* Capitalize first letter */}
        <div className = 'desc'>{currWeather.description.charAt(0).toUpperCase() + currWeather.description.slice(1)}</div>
      </div>

      <div className="temperature">
        <div className = 'tempIcon'><img alt={currWeather.weatherIcon} src={iconUrl}></img></div>
        <div className = 'temp'> {Math.round(currWeather.temp)} °C</div>
      </div>

      
      <div className = 'date'>
        <div className = 'day'>{month} {day}</div>
        <div className = 'time'>{timeWithoutSecond}</div>
      </div>

      <div className='statistics'>
        <div>Wind: {currWeather.windSpeed} m/s</div>
        <div>Humidity: {currWeather.humidity} %</div>
        <div>Precipitation (3 h): {currWeather.rain} mm</div>
      </div>
    </div>
    <HourlyWeatherCard list={weatherListCopy}  />
  </div>
  );
};

export default CityWeather;
