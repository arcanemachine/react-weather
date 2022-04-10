import React from 'react';
import CityAddForm from '../components/CityAddForm.js';
import CityList from '../components/CityList.js';

import { REACT_APP_WEATHER_API_KEY } from '../keys.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cities: []
    };
  }

  componentDidMount() {
    // pull data from localStorage
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
    const apiKey = REACT_APP_WEATHER_API_KEY;
    const units = 'metric';
    const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const url = `${weatherApiUrl}?q=${name}&appid=${atob(apiKey)}&units=${units}`;
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
        id: fetchedCityData.id,
        name: fetchedCityData.name,
        data: fetchedCityData }]
    })
  }

  cityRemove(city) {
    let cities = this.state.cities;
    let currentCityIndex = cities.map(each => each.id).indexOf(city.id);
    cities.splice(currentCityIndex, 1);
    this.setState({ cities });
  }

  render() {
    return (
      <div>
        <CityAddForm cityAdd={(name) => this.cityAdd(name)} />
        <CityList buildWeatherApiUrl={() => this.buildWeatherApiUrl()}
                  cities={this.state.cities}
                  cityRemove={(city) => this.cityRemove(city)} />
      </div>
    );
  }
}
