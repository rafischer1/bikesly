//Global vars
let badInput = false
let myStorage = window.localStorage
let tempF
let tempFtoday
let favSearchCity
let favSearchCompany
let lat
let lon
let windMPH = 0
var windDir
let parentElement = document.getElementById('trip-card-favorites')
let clearStorageBtn = document.getElementById('clearStorage')
let fullTripImage = document.getElementById('fullTripImage')
let signOut = document.getElementById('signOut')

//DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', () => {
  console.log('script: on')
  signOut.style.display = 'none'

  //DOM STRINGS relevant to DOMloaded
  let cardContainer = document.querySelector('div.bothCards')

  //login and client validation
  let signIn = document.getElementById('signInBtn')


  signIn.addEventListener('click', (e) => {
    console.log(`login target`, e.target)
    let loginCard = document.getElementById('loginCard')
    loginCard.style.display = 'block'
  })

  let loginClose = document.getElementById('loginClose')
  loginClose.addEventListener('click', () => {
    loginCard.style.display = 'none'
  })

  let loginSubmitBtn = document.getElementById('loginSubmitBtn')

  loginSubmitBtn.addEventListener('click', (e) => {
    let inputValidate = document.getElementById('userNameValidate')
    let displayName = document.getElementById('displayName')
    let signIn = document.getElementById('signInBtn')
    let signUp = document.getElementById('signUpHeader')
    let signOut = document.getElementById('signOut')
    e.preventDefault()
    console.log(`e submit`, e.target)
    console.log(inputValidate.value)
    if (inputValidate.value === "bikesly123") {
      loginCard.style.animation = "fade-out 2s 1"
      setTimeout(() => {
        loginCard.style.display = 'none'
        signIn.style.display = "none"
        signUp.style.display = "none"
        signOut.style.display = 'inline'
        displayName.innerText = "Hi, Bikesly123!"

      }, 1500);

    } else {
      loginCard.style.animation = "none"
      alert(`please input username again - must be more than 5 characters
      (for DEMO use: 'bikesly123')`)
    }

    signOut.addEventListener('click', () => {
      setTimeout(() => {
        inputValidate.value = ''
        signIn.style.display = "inline"
        signUp.style.display = "inline"
        signOut.style.display = 'none'
        displayName.innerText = ''
        // cardContainer.style.display = 'none'
        cardContainer.style.animation = "fade-out 2s 1"
      }, 1000);
      setTimeout(() => {
        cardContainer.style.display = 'block'
      }, 2000);

    })

  })


  //main page toggling function
  const popUps = () => {
    let quickSearchBtn = document.getElementById('quickSearchCard')
    let tripPlanningPage = document.getElementById('tripPlanPopUp')
    let tripPlanBtn = document.getElementById('tripPlanCard')
    let popUpQuickSearch = document.getElementById('quickSearchPopUp')

    // Event listener to toggle main display
    cardContainer.addEventListener('click', (event) => {
      event.preventDefault()
      // console.log(event.target)
      if (event.target === tripPlanBtn) {
        tripPlanningPage.style.display = 'block'
        fullTripImage.src = "./images/tripPlan.jpeg"
        tripCityName.innerText = ``
        tripCityCompany.innerText = ''
        tripPlanText.value = ''
        tripPlanGSearch.innerText = ``
        cardContainer.style.display = 'none'
        popUpQuickSearch.style.display = 'none'
      }

      if (event.target === quickSearchBtn) {
        console.log(`quick search`)
        popUpQuickSearch.style.display = 'block'
        cardContainer.style.display = 'none'
        tripPlanningPage.style.display = 'none'
      }

    })

    // quick search close out
    popUpClose.addEventListener('click', (event) => {
      event.preventDefault()
      let popUpClose = document.getElementById('popUpClose')
      // console.log(`x-out pop up`, event.target)
      if (event.target === popUpClose) {
        popUpQuickSearch.style.display = 'none'
        cardContainer.style.display = 'block'
        tripPlanningPage.style.display = 'none'
      }
    })

    // trip plan close out
    popUpClose2.addEventListener('click', (event) => {
      event.preventDefault()
      let popUpClose2 = document.getElementById('popUpClose2')
      // console.log(`x-out pop up`, event.target)
      if (event.target === popUpClose2) {
        popUpQuickSearch.style.display = 'none'
        cardContainer.style.display = 'block'
        tripPlanningPage.style.display = 'none'
      }

    })

  }
  popUps()

  // local storage DOM strings and functionality
  let favSaveBtn = document.getElementById('favorites')
  let favGet = document.querySelector('.favGetItem')


  favSaveBtn.addEventListener('click', (event) => {

    let name = favSearchCity
    let curFavTemp = `Current: ${tempFtoday}  F`
    let curSearch = `https://www.google.com/search?ei=ueCfW4HwKs3j_AaTtJfYBg&q=${name}+${favSearchCompany}`

    // retrieve it (Or create a blank array if there isn't any info saved yet),
    let faves = JSON.parse(localStorage.getItem('favorites')) || { cities: [] }

    console.log(`cities pre-push:`, faves.cities)
    faves.cities.push([name, curFavTemp, curSearch])
    console.log(`cities post-push:`, faves.cities)

    // then put it back.
    let favesJSON = JSON.stringify(faves)
    console.log(`cities as JSON:`, favesJSON);
    localStorage.setItem('favorites', favesJSON)

    getItem()
  })

  // END OF DOM CONTENT LOADED SCOPE
})

//setting items in the saved favs box
const getItem = () => {
  let childDiv = document.createElement('div')
  let savedFavName = document.createElement('p')
  let savedCurWeather = document.createElement('p')
  let favNavLink = document.getElementById('favNavLink')
  let favCurWeather = document.getElementById('favCurWeather')
  let savedCurReference = document.createElement('a')
  parentElement.style.display = 'inline'
  // favGet.style.display = "inline"

  item = JSON.parse(myStorage.getItem('favorites'))

  for (let cities in item) {
    for (let i = 0; i < item.cities.length; i++) {
      console.log(`item.cities length:`, item.cities.length)
      parentElement.appendChild(childDiv)
      childDiv.setAttribute("class", "savedFavorite")
      childDiv.appendChild(savedFavName)
      savedFavName.setAttribute("class", "savedFavName")
      childDiv.appendChild(savedCurWeather)
      savedCurWeather.setAttribute("class", "savedCurWeather")
      childDiv.appendChild(savedCurReference)
      savedCurReference.setAttribute('id', 'favNavLink')
      savedCurReference.setAttribute('target', '_blank')

      //for each array create a div and populate it with information
      savedFavName.innerText = item.cities[i][0]
      console.log(`item.cities[i][0]`, item.cities[i][0])
      savedCurWeather.innerText = item.cities[i][1]
      console.log(`item.cities[i][1]`, item.cities[i][1])
      savedCurReference.innerText = `Quick Link for ${item.cities[i][0]}`
      savedCurReference.href = item.cities[i][2]
      console.log(`item.cities[i][2]`, item.cities[i][2])

    }
  }
}

//API's !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Quick Search Functionality and BIKE API
const quickSearch = () => {
  // DOM Strings for quick search
  let quickWeather = document.getElementById('quickWeather')
  let quickWeatherDescription = document.getElementById('quickWeatherDesc')
  let quickWeatherWind = document.getElementById('quickWeatherWind')
  let quickSearchGSearch = document.getElementById('quickSearchGSearch')
  let quickSearchText = document.getElementById('quickSearchText')
  let quickSearchSubmit = document.getElementById('quickSearchSubmit')
  let errorMessageLinkquick = document.getElementById('errorMessageLinkquick')
  // quickSearchSubmit.setAttribute('type', 'submit')

  //quick search event listener
  quickSearchSubmit.addEventListener('click', (event) => {
    quickAlertCard.style.display = "none"
    // event.preventDefault()

    console.log(`value`, quickSearchText.value)

    // primary axios API call to bike networks
    axios.get(
        `http://api.citybik.es/v2/networks?fields=id,name,href,location`
      )
      .then((response) => {
        let data = response.data
        let networks = response.data.networks
        let quickAlertCard = document.getElementById('quickAlertCard')

        // setting a single bike city an company
        for (let city in networks) {
          if (networks[city].location.city !== quickSearchText.value) {
            badInput = true
            if (badInput === true) {
              console.log(`nope`)
              quickAlertCard.style.display = "block"
              errorMessageLinkquick.href = `https://www.google.com/search?ei=ueCfW4HwKs3j_AaTtJfYBg&q=${quickSearchText.value}+bicycle+rental`

            }
          } else if (networks[city].location.city === quickSearchText.value) {
            badInput = false
            quickAlertCard.style.display = "none"

            document.getElementById('location').innerText =
              `${networks[city].location.city}`
            document.getElementById('company').innerText = `City Bike rentals from: ${networks[city].name}`
            console.log(networks[city].name)

            //set parameters in g search href default 
            quickSearchGSearch.href = `https://www.google.com/search?ei=ueCfW4HwKs3j_AaTtJfYBg&q=${networks[city].location.city}+${networks[city].name}`

            // set lat and long somehow...
            lat = networks[city].location.latitude
            lon = networks[city].location.longitude

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=374aebc81ab8f72a5d804b246e8f739f`)
              .then((response) => {
                let tempK = parseInt(response.data.main.temp)
                let weatherDescription = response.data.weather[0].description
                let weatherWind = parseInt(response.data.wind.speed)
                let windDegree = parseInt(response.data.wind.deg)

                // temperature conversion f(x)
                const tempConversion = (tempK) => (1.8 * (tempK - 273) + 32).toFixed(1)
                tempF = tempConversion(tempK)

                // wind conversion f(x)
                const windConversion = (weatherWind) =>
                  (weatherWind * 2.2369).toFixed(2)
                windMPH = windConversion(weatherWind)
                console.log(`windMPH`, parseInt(windMPH))

                // let wind = windConversion(weatherWind)
                //wind direction tempConversion
                const windDirection = (windDegree) => {
                  if (windDegree > 330) {
                    windDir = 'N'
                  } else if (windDegree <= 330 && windDegree > 290) {
                    windDir = "NW"
                  } else if (windDegree <= 290 && windDegree > 250) {
                    windDir = "W"
                  } else if (windDegree <= 250 && windDegree > 210) {
                    windDir = "SW"
                  } else if (windDegree <= 210 && windDegree > 140) {
                    windDir = "S"
                  } else if (windDegree <= 140 && windDegree > 120) {
                    windDir = "SE"
                  } else if (windDegree <= 120 && windDegree > 80) {
                    windDir = "E"
                  } else if (windDegree <= 80 && windDegree > 30) {
                    windDir = "NE"
                  } else {
                    windDir = "N"
                  }
                  return windDir
                }
                winDir = windDirection(windDegree)
                // weather API 
                // let weatherKey = '374aebc81ab8f72a5d804b246e8f739f'
                // weather innerTexting
                quickWeather.innerText = `Current temp: ${tempF} F`
                quickWeatherDescription.innerText = `Current forecast: ${weatherDescription}`
                quickWeatherWind.innerText = `Current Wind Speed: ${windMPH} mph Dir: ${windDir}`


              })

            return badInput
          }
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
  })
}
quickSearch()

// Trip Planning Functionality and API calls //DOM STRINGS
let tripWeatherTomorrow = document.getElementById('tripWeatherTom')
let tripWeatherTwoDays = document.getElementById('tripWeatherTwoDays')
let tripWeatherThreeDays = document.getElementById('tripWeatherThreeDays')
let tripWeatherImage1 = document.getElementById('tripWeatherImg1')
let tripWeatherImage2 = document.getElementById('tripWeatherImg2')
let tripWeatherImage3 = document.getElementById('tripWeatherImg3')
let tripWeatherImage4 = document.getElementById('tripWeatherImg4')
let tripCityCompany = document.getElementById('tripCompany')

let tripCityName = document.getElementById('tripLocation')
const tripPlan = () => {
  // Trip Planning DOM STRING
  let tripPlanGSearch = document.getElementById('tripPlanGSearch')
  let tripPlanText = document.getElementById('tripPlanText')
  let tripWeatherTomorrow = document.getElementById('tripWeatherTom')
  let tripWeatherTwoDays = document.getElementById('tripWeatherTwoDays')
  let tripWeatherThreeDays = document.getElementById('tripWeatherThreeDays')
  let tripWeatherImage1 = document.getElementById('tripWeatherImg1')
  let tripWeatherImage2 = document.getElementById('tripWeatherImg2')
  let tripWeatherImage3 = document.getElementById('tripWeatherImg3')
  let tripWeatherImage4 = document.getElementById('tripWeatherImg4')
  let errorMessageLinktrip = document.getElementById('errorMessageLinktrip')

  tripPlanSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    tripAlertCard.style.display = "none"
    console.log(`trip submit:`, tripPlanText.value)

    // primary axios API call to bike networks
    axios.get(
        `http://api.citybik.es/v2/networks?fields=id,name,href,location`
      )
      .then((response) => {
        let networks = response.data.networks

        // setting a single bike city an company
        for (let city in networks) {
          favSearchCity = networks[city].location.city
          favSearchCompany = networks[city].name
          // console.log(networks[city].location.city)
          if (networks[city].location.city !== tripPlanText.value) {
            badInput = true
            if (badInput === true) {
              // console.log(`nope`)
              tripAlertCard.style.display = "block"
              errorMessageLinktrip.href = `https://www.google.com/search?ei=ueCfW4HwKs3j_AaTtJfYBg&q=${tripPlanText.value}+bicycle+rental`

            }
          } else if (networks[city].location.city === tripPlanText.value) {
            badInput = false

            tripCityName.innerText = `${networks[city].location.city}`
            tripCityCompany.innerText = `City Bike rentals from: ${networks[city].name}`

            //set parameters in g search href default 
            tripPlanGSearch.innerText = `Find More Information/Map`
            tripPlanGSearch.href = `https://www.google.com/search?ei=ueCfW4HwKs3j_AaTtJfYBg&q=${networks[city].location.city}+${networks[city].name}`

            // set lat and long somehow...
            lat = networks[city].location.latitude
            lon = networks[city].location.longitude

            //trip planning weather API call
            // 3 hour multi day forecast: https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=374aebc81ab8f72a5d804b246e8f739f
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=374aebc81ab8f72a5d804b246e8f739f`)
              .then(function(response, lat, lon) {
                // console.log(`weather:`, response.data.list)
                let weatherList = response.data.list
                console.log(`weather list`, weatherList)
                for (let day in weatherList) {
                  let tempFtom
                  let tempFtwoDays
                  let tempKnow = parseInt(weatherList[0].main.temp)
                  let tempKtom = parseInt(weatherList[6].main.temp)
                  let tempKtwoDays = parseInt(weatherList[14].main.temp)
                  let tempKthreeDays = parseInt(weatherList[22].main.temp)

                  const tempConversion = () => (1.8 * (tempKnow - 273) + 32).toFixed(1)
                  tempFtoday = tempConversion(tempKnow)

                  const tempTomConversion = () => (1.8 * (tempKtom - 273) + 32).toFixed(1)
                  tempFtom = tempTomConversion(tempKtom)

                  const tempTwoDaysConversion = () => (1.8 * (tempKtwoDays - 273) + 32).toFixed(1)
                  tempFtwoDays = tempTwoDaysConversion(tempKtwoDays)

                  const threeDaysconversion = () => (1.8 * (tempKtwoDays - 273) + 32).toFixed(1)
                  tempFthreeDays = threeDaysconversion(tempKthreeDays)

                  // // weather innerTexting
                  tripWeather.innerText = `${tempFtoday} F`
                  // tripWeatherTomorrow.innerText = `${tommorrow}: ${tempFtom} F`
                  tripWeatherTomorrow.innerText = `${tempFtom} F`
                  // tripWeatherTwoDays.innerText = `${twoDaysFinal}: ${tempFtwoDays} F`
                  tripWeatherTwoDays.innerText = `${tempFtwoDays} F`
                  tripWeatherThreeDays.innerText = `${tempFthreeDays} F`

                  //set weather icon
             
                  tripWeatherImage1.src = `http://openweathermap.org/img/w/${weatherList[0].weather[0].icon}.png`
                  tripWeatherImage2.src = `http://openweathermap.org/img/w/${weatherList[6].weather[0].icon}.png`
                  tripWeatherImage3.src = `http://openweathermap.org/img/w/${weatherList[14].weather[0].icon}.png`
                  tripWeatherImage4.src = `http://openweathermap.org/img/w/${weatherList[22].weather[0].icon}.png`
                }
              })
            return badInput
          }
        }
      })
  })
}
tripPlan()

//clear local storage function
clearStorageBtn.addEventListener('click', () => {
  console.log(`clear storage...`)
  localStorage.clear()
  tripWeather.innerText = ``
  tripWeatherTomorrow.innerText = ``
  tripWeatherTwoDays.innerText = ``
  tripWeatherThreeDays.innerText = ``
  tripWeatherImage1.src = ``
  tripWeatherImage2.src = ``
  tripWeatherImage3.src = ``
  tripWeatherImage4.src = ``
  tripPlanGSearch.href = ``
  tripPlanGSearch.innerText = ``
  tripCityName.innerText = `Happy Cycling!`
  tripCityCompany.innerText = ''
  tripPlanText.value = ''
  fullTripImage.src = "./images/ending.jpeg"
  parentElement.style.display = 'none'
})

// temperature conversion f(x)
const tempConversion = (tempK) => (1.8 * (tempK - 273) + 32).toFixed(1)
tempF = tempConversion()

// wind conversion f(x)
const windConversion = (weatherWind) =>
  (weatherWind * 2.2369).toFixed(2)
windMPH = windConversion()

//wind direction tempConversion
function windDirection(windDegree) {
  if (windDegree > 330) {
    windDir = 'N'
  } else if (windDegree <= 330 && windDegree > 290) {
    windDir = "NW"
  } else if (windDegree <= 290 && windDegree > 250) {
    windDir = "W"
  } else if (windDegree <= 250 && windDegree > 210) {
    windDir = "SW"
  } else if (windDegree <= 210 && windDegree > 140) {
    windDir = "S"
  } else if (windDegree <= 140 && windDegree > 120) {
    windDir = "SE"
  } else if (windDegree <= 120 && windDegree > 80) {
    windDir = "E"
  } else if (windDegree <= 80 && windDegree > 30) {
    windDir = "NE"
  } else {
    windDir = "N"
  }
  return windDir
}
winDir = windDirection()