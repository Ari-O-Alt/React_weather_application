import React from 'react';
import './App.css';
import { api } from './config';

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [weather, setWeather] = React.useState({});

  const searchTemp = (event) => {
    if (event.key === 'Enter') {
      fetch(
        `${api.base}weather?q=${searchTerm}&units=metric&appid=${api.apiKey}`
      )
        .then((returnResult) => returnResult.json())
        .then((finalResult) => {
          setWeather(finalResult);
          setSearchTerm('');
        });
    }
  };

  const buildDate = (rawDate) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const day = days[rawDate.getDay()];
    const date = rawDate.getDate();
    const month = months[rawDate.getMonth()];
    const year = rawDate.getFullYear();

    return `${day}, ${date} ${month}, ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main !== 'undefined'
          ? weather.main.temp > 16
            ? 'appWarm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className='searchBox'>
          <input
            type='text'
            className='searchBar'
            placeholder='Search...'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyPress={searchTemp}
          />
        </div>
        {typeof weather.main !== 'undefined' ? (
          <React.Fragment>
            <div className='locationContainer'>
              <p className='location'>
                {weather.name}, {weather.sys.country}
              </p>
              <p className='date'>{buildDate(new Date())}</p>
            </div>
            <div className='weatherContainer'>
              <p className='temperature'>{Math.round(weather.main.temp)}°C</p>
              <p className='weather'>{weather.weather[0].main}</p>
            </div>{' '}
          </React.Fragment>
        ) : (
          ''
        )}
      </main>
    </div>
  );
};

export default App;
