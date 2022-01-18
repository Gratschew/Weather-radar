import { useState, useEffect } from 'react';
import Header from './components/Header'
import Dropdown from './components/Dropdown';

function App() {
  let initialArray = [];
  const [allWeatherInfo, setWeatherInfo] = useState(initialArray);
  const idTampere = '634964';
  const idJyväskylä = '655195';
  const idKuopio = '650225';
  const idHelsinki = '658225';
  //634964 Tampere, 655195 Jyväskylä, 650225 Kuopio, 658225 Helsinki
  const cityIds = [idTampere, idJyväskylä, idKuopio, idHelsinki];
  const apiKey = 'bfe7551f1920b85d5b0bf30db19bcd7d';
  useEffect(() => {
    async function fetchWeather(cityId){
      await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&cnt=6&appid=${apiKey}`)
      .then(res => res.json())
      //.then(res => setWeatherInfo(allWeatherInfo => [... allWeatherInfo, res]));
      .then(res => {
  
        let weatherObject = {
          id: res.city.id,
          name: res.city.name,
          list: [res.list.map(value => ({
            temp: value.main.temp,
            humidity: value.main.humidity,
            description: value.weather[0].description,
            weatherIcon: value.weather[0].icon, 
            windSpeed: value.wind.speed,
            time: value.dt_txt
          }))]
        }
        setWeatherInfo(allWeatherInfo => [... allWeatherInfo, weatherObject])
        
      });
    }

    cityIds.forEach((id, i) => fetchWeather(id));
  }, []);

  useEffect(() => {
    console.log(allWeatherInfo);
  }, [allWeatherInfo]);


  return (
    <div className="container">
      <Header />
      <Dropdown />
    </div>
  );
}

export default App;
