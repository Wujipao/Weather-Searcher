import {useState, useEffect} from 'react';
import catarman from './assets/catarman.gif'
function Weather(){
    const [place, setPlace] = useState('');
    const [country, setCountry] = useState('');
    const [temperature, setTemperature] = useState(null);
    const [weatherStatus, setWeatherStatus] = useState('');
    const [humidity, setHumidity] = useState(null);
    const [time, setTime] = useState('');
    const [search, setSearch] = useState('');

    const API_KEY = 'b1305dccee34671bd88a1d47ab04b814';

    const fetchWeather = async () => {
        if (!search) return;
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`);
            const weatherData = await response.json();

            console.log(weatherData);

            if (weatherData.cod === 200) {
                setPlace(weatherData.name);
                setCountry(weatherData.sys.country);
                setTemperature(weatherData.main.temp);
                setWeatherStatus(weatherData.weather[0].main);
                setHumidity(weatherData.main.humidity);
                const currentTime = new Date().toLocaleTimeString();
                setTime(currentTime);
            } else {
                alert('City not found. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return(
        <>
        <div className = 'search'>
            <input
            type = "text"
            placeholder = "Search a place..."
            value ={search}
            onChange = {(e) => setSearch(e.target.value)}
            />
            <button onClick ={() => fetchWeather(search)}><strong>Enter</strong></button>
        </div>
        <div className = "weatherCard">
            <div className = "weatherInfo">
                <div className = "weatherTable">
                    <table>
                        <caption>Weather Update: </caption>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Place</th>
                                <th>Temperature</th>
                                <th>Weather Status</th>
                                <th>Humidity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{country}</td>
                                <td>{place}</td>
                                <td>{temperature !== null ?  `${temperature}°C` : ''}</td>
                                <td>{weatherStatus}</td>
                                <td>{humidity !== null ? `${humidity}%` : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className = "weatherTime">
                    <p>{time && `Updated as of ${time}`}</p>
                </div>
            </div>
        </div>
        </>
    );

}
export default Weather