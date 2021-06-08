import React from 'react';
import CityAddForm from '../components/CityAddForm.js';
import CityList from '../components/CityList.js';

import { WEATHER_API_KEY } from '../keys.js';


export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cities: [],
    };
  }

  componentDidMount() {
    if(localStorage.getItem('cities')) {
      this.setState({
        cities: JSON.parse(localStorage.getItem('cities'))
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('cities', JSON.stringify(this.state.cities));
  }

  buildWeatherApiUrl(name) {
    const api_key = WEATHER_API_KEY;
    const units = 'metric';
    const weather_api_url = 'https://api.openweathermap.org/data/2.5/weather';
    const url = `${weather_api_url}?q=${name}&appid=${api_key}&units=${units}`;
    return url;
  }

  async cityAdd(name) {
    const cityName = name;

    // if city name is blank, do nothing
    if (!cityName) {
      return false;
    }

    // check if the city exists
    const fetchedCityData = await fetch(this.buildWeatherApiUrl(cityName))
      .then(response => {
        if (!response.ok) {
          const statusCode = response.status;
          if (statusCode === 404) {
            alert('Error 404: City not found!');
          }
          else if (statusCode === 401) {
            alert('Error 401: Invalid API key');
          }
        }
        else return response.json()
      })

    if (!fetchedCityData) {
      return false;
    }

    // do not add duplicate cities
    let matchingCities = this.state.cities.filter(
      (city) => city.id === fetchedCityData.id);
    if (matchingCities.length) {
      alert('This location is already in your list!')
      return false;
    }

    // add the city to the list
    this.setState({
      cities: [...this.state.cities, {
        name: `${fetchedCityData.name}, ${fetchedCityData.sys.country}`,
        id: fetchedCityData.id
      }]
    })
  }

  cityRemove(city) {
    let cities = this.state.cities;
    let currentCityIndex = cities.map(each => each.id).indexOf(city.id);
    cities.splice(currentCityIndex, 1);
    this.setState({ cities });
  }

  sayHello() {
    console.log('hello!');
  }

  render() {
    return (
      <div>
        <CityAddForm emitCityAdd={(name) => this.cityAdd(name)} />
        <CityList buildWeatherApiUrl={this.buildWeatherApiUrl}
                  cities={this.state.cities}
                  cityRemove={(city) => this.cityRemove(city)} />
      </div>
    );
  }
}
