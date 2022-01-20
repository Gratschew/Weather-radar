import React from 'react';

const HourlyWeatherCard = ({ list }) => {
   console.log(list);
  return<div className='hourlyWeatherCards'>
   {!!list && list.map((hourly, index) => (
    <div key = {index.toString()} className = "hourlyWeatherCard"> 
      <div className = 'hourlyWeather'>

         {/* Format time */}
         <div className = 'time'>{new Date(hourly.time).
         toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'})}</div>
         <div><img src = {"http://openweathermap.org/img/wn/" + hourly.weatherIcon + ".png"}></img></div>
         <div>{Math.round(hourly.temp)} °C</div>
      </div>
      <div className = 'hourlyStatistics'>
         <div>{hourly.windSpeed} m/s</div>
         <div>{hourly.humidity} %</div>
         <div>{hourly.rain} mm</div>
      </div>
     </div>
  ))}
  </div> 
};

export default HourlyWeatherCard;
