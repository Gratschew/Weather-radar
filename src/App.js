import { useState, useEffect } from 'react';
import Header from './components/Header'
import Dropdown from './components/Dropdown';
import CityWeather from './components/CityWeather'

function App() {
  // weather info for all the cities
  const [allWeatherInfo, setWeatherInfo] = useState([]);

  // weather info for one or all the cities
  const [filteredWeatherInfo, setFilteredWeatherInfo] = useState([]);
  const [error, setError] = useState(false);


  const idHelsinki = '658225';
  const idJyvaskyla = '655195';
  const idKuopio = '650225';
  const idTampere = '634964';

  const cityIds = [idHelsinki, idJyvaskyla, idKuopio, idTampere];


  const fetchWeather = async () => {
    Promise.all(cityIds.map(async (cityId) => 
    await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&cnt=6&appid=${process.env.REACT_APP_API_KEY}`))).then(promises => {
      return Promise.all(promises.map(response => response.json()));
    }).then(response => response.map(res =>{
        let weatherObject = {
          id: res.city.id,
          name: res.city.name,
          list: [res.list.map(value => ({
            temp: value.main.temp,
            humidity: value.main.humidity,
            description: value.weather[0].description,
            weatherIcon: value.weather[0].icon, 
            windSpeed: value.wind.speed,
            time: value.dt_txt,
            // rain is an optional property, which means it isn't always present as a a property in the data
            // then rain amount is set to 0
            rain: (!('rain' in value) ? 0 : value.rain['3h'])
          }))]
        }
        setWeatherInfo(allWeatherInfo => [... allWeatherInfo, weatherObject]);
    }))
    .catch(e => setError(true));
  }
  
  // fetch weather data on init
  useEffect(() => {
    fetchWeather();
  }
, [])

  // update filteredWeatherInfo when allWeatherInfo is updated
  useEffect(() => {
    setFilteredWeatherInfo(allWeatherInfo);
  }, [allWeatherInfo]);

  // set filteredWeatherInfo to one city's/every cities' info
  const changeCities = (city) => {
    const weatherCopy = [...allWeatherInfo];

    if(city === 'allCities'){
      setFilteredWeatherInfo(weatherCopy);
    }
    else if(city === 'Helsinki'){
      const filteredList = weatherCopy.filter(
        e => e.id===parseInt(idHelsinki))
      setFilteredWeatherInfo(filteredList);
    }
    else if(city === 'Tampere'){
      const filteredList = weatherCopy.filter(
        e => e.id===parseInt(idTampere))
      setFilteredWeatherInfo(filteredList);
    }
    else if(city === 'Jyvaskyla'){
      const filteredList = weatherCopy.filter(
        e => e.id===parseInt(idJyvaskyla))
      setFilteredWeatherInfo(filteredList);
    }
    else if(city === 'Kuopio'){
      const filteredList = weatherCopy.filter(
        e => e.id===parseInt(idKuopio))
      setFilteredWeatherInfo(filteredList);
    }
  }


  return (
    <div className="container">
      <Header />
      <Dropdown onCityChange={changeCities}/>
      <div className='weathersContainer'>
      {!!filteredWeatherInfo && filteredWeatherInfo.map((weather, i) => 
        <div key = {weather.id.toString()}>
        <CityWeather name={weather.name} weatherList={weather.list} />
        </div>
      )}
      </div>
      {error && <h3>Error fetching the weather data</h3>}
    </div>
  );
    }

export default App;
