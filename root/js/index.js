const apiKey = 'df32e3f7e75ec41184aea0d4145e123d';

const fetchData = position => {

    const {latitude, longitude} = position.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)

        .then(response => response.json())
        .then(data => setWeaterData(data));
}



const setWeaterData = data => {

    console.log(data);

    const weatherData = {
        locationRegion: data.name,
        locationCountry: data.sys.country,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windStatus: data.wind.speed,
        temperature: data.main.temp,
        temperatureMax: data.main.temp_max,
        temperatureMin: data.main.temp_min,
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];
    });
}

const getDate = () => {
    
    let date = new Date();

    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

const onLoad = () => {

    navigator.geolocation.getCurrentPosition(fetchData);
}

