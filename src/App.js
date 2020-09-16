import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';
import './App.css';

const API_key="2a1533c2987dc7edd4a513ac765cfd19";

class App extends React.Component {
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      temp: undefined,
      max_temp:undefined,
      min_temp:undefined,
      description: undefined,
      error:false,
    };
    
    
    this.weatherIcon={
      Thunderstorm :"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-rain",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog",

    };
    }
    calCelsius=(temp)=>{
      let celcius=Math.floor(temp-273.15);
      return celcius;
    }
    get_WeatherIcon=(icon,rangeId)=>{
      switch(true){
        case rangeId >= 200 && rangeId <=232:
          this.setState({icon:this.weatherIcon.Thunderstorm});
          break;
        case rangeId >= 300 && rangeId <=321:
          this.setState({icon:this.weatherIcon.Drizzle});
          break;
        case rangeId >= 500 && rangeId <=531:
          this.setState({icon:this.weatherIcon.Rain});
          break;
        case rangeId >= 600 && rangeId <=622:
          this.setState({icon:this.weatherIcon.Snow});
          break;
        case rangeId >= 701 && rangeId <=781:
          this.setState({icon:this.weatherIcon.Atmosphere});
          break;
        case rangeId ===800:
          this.setState({icon:this.weatherIcon.Clear});
          break;
        case rangeId >= 801 && rangeId <=804:
          this.setState({icon:this.weatherIcon.Clouds});
          break;
        default:
          this.setState({icon:this.weatherIcon.Clouds});
      }

    }
    getWeather= async (e)=>{

      e.preventDefault();

      const city=e.target.elements.city.value;
      const country=e.target.elements.country.value;
      if (city && country){
        const api_call=  await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

        const response = await api_call.json();
        console.log(response);
           
        this.setState({
          city :`${response.name}, ${response.sys.country}`,
          temp: this.calCelsius(response.main.temp),
          max_temp:this.calCelsius(response.main.temp_max),
          min_temp:this.calCelsius(response.main.temp_min),
          description:response.weather[0].description,
          error:false,
      
  
        })
        this.get_WeatherIcon(this.getWeatherIcon,response.weather[0].id);

      }
      else{
        this.setState({error:true
        });
      }
     
      };

  render(){
    return (
      <div className="App">
      <Form loadWeather={this.getWeather} error={this.state.error}/>
      <Weather
      city={this.state.city} 
      country={this.state.country}
      temp={this.state.temp}
      max_temp={this.state.max_temp}
      min_temp={this.state.min_temp}
      description={this.state.description }
      weatherIcon={this.state.icon}/>
      </div>
    )}
};
export default App;