import { useState, useEffect } from 'react'
import countryService from './services/countries'

const SearchBar = ({searchedCountry, handleSearchChange}) => {
  return(
    <div>
      find countries <input value = {searchedCountry}
                    onChange={handleSearchChange} />
    </div>
  )
}

const CountryLine = ({country}) => {

  const [showDetails, setShowDetails] = useState(false)

  const handleButtonPress = () =>
  {
    setShowDetails(!showDetails)
  }


  if(showDetails)
  {
    return(
      <div>
        <CountryData country={country}/>
      </div>
    )
  }
  else
  {
    return(
      <p>
        {country.name.common} <button onClick={handleButtonPress}>Show</button>
      </p>
    )
  }
}

const CountryLanguage = ({country}) => {
  return(
    Object.values(country.languages).map(language => <li key= {language}>{language}</li>)
  )
}

const CapitalWeather = ({capitalName}) => {

  const [weather, setWeather] = useState([])
  const [weatherFound, setWeatherFound] = useState(false)

  useEffect(() => {
    countryService.getCapitalWeather(capitalName)
      .then(capitalWeather => {
        setWeather(capitalWeather)
        setWeatherFound(true)
      })
  }, [])

  if(weatherFound)
  {
    return(
      <>
        <h3>Weather in {capitalName}</h3>
        <p>Temperature {Number(weather.main.temp -273.15).toFixed(2)} degrees</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>Wind {Number(weather.wind.speed).toFixed(1)} m/s</p>
      </>
    )
  }
  else
  {
    return(
      <p>
        Weather information not found
      </p>
    )
  }
}

const CountryData = ({country}) => {

  return(
    <div>
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          <CountryLanguage country={country}/>
        </ul>
      </div>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} width={250}/>
      </div>
      <div>
        <CapitalWeather capitalName={country.capital[0]}/>
      </div>
    </div>
  )
}

const CountryDisplay = ({countriesToShow}) => {

  if(countriesToShow.length > 10)
  {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if(countriesToShow.length > 1)
  {
    return(
      countriesToShow.map((country) => <CountryLine key= {country.name.common} country={country}/>)
    )
  }
  else if(countriesToShow.length == 1)
  {
    return(
      <div>
        <CountryData country={countriesToShow[0]}/>
      </div>
    )
  }
  else
  {
    return(
      <div>
        No country found
      </div>
    )
  }
}


const App = () => {

  const [searchedText, setSearchedText] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService.getInitialList()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchChange = (event) =>
  {
    setSearchedText(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchedText.toLowerCase()))


  return (
    <div>
      <SearchBar handleSearchChange={handleSearchChange} searchedCountry={searchedText}/>
      <CountryDisplay countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App