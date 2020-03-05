import React from 'react'
import axios from 'axios'

const weatherToken = process.env.WEATHER_ACCESS_KEY

class Footer extends React.Component {
  state = {  weather: null }

  componentDidMount() {
    this.getWeather()
    this.interval = setInterval(this.getWeather , 300000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getWeather = async () => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherToken}`)
      this.setState({ weather: res.data })
    } catch (err){
      console.log(err)
    }
  }
 
  render() {
    if (!this.state.weather) return null
    return ( 
      <footer className="footer">
        <div className="columns">
          <div className="column is-half-mobile is-one-half-desktop" id="Weather">
            <h1 className="has-text-weight-normal">Weather Report: {this.state.weather.weather[0].main}</h1>
            <h2 className="has-text-weight-normal">Temperature: {Math.floor((this.state.weather.main.temp) - (273.15))}°C</h2>
            <h2 className="has-text-weight-normal">Wind Speed: {this.state.weather.wind.speed} km</h2>
            <h2>{this.state.weather.weather[0].description}</h2>
            <figure className="image-card">
              <img src={`http://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}.png`} alt={this.state.weather.weather[0].main} />
            </figure>
          </div>
          <div className="column is-half-mobile is-one-half-desktop" id="socialMedia">
            <a href="#"><img src="https://image.flaticon.com/icons/svg/174/174848.svg" id="img" /></a>
            <a href="#"><img src="https://image.flaticon.com/icons/svg/174/174855.svg" id="img"/></a>
            <a href="#"><img src="https://image.flaticon.com/icons/svg/733/733579.svg" id="img"/></a>
            <a href="#"><img src="https://image.flaticon.com/icons/svg/174/174883.svg" id="img"/></a>
            <a href="#"><img src="https://image.flaticon.com/icons/svg/355/355980.svg" id="img"/></a>
          </div>
        </div>
      </footer>
    )
  }

}
export default Footer