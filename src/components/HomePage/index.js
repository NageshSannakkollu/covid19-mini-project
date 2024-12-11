import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import StateList from '../StateList'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class HomePage extends Component {
  state = {
    apiStatus: apiConstants.initial,
    covidData: [],
    totalConfirmed: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    totalActive: 0,
    searchInput: '',
    showSearchSuggestions: false,
  }

  componentDidMount() {
    this.getStateData()
  }

  getStateData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const responseData = await response.json()
      let confirmedCases = 0
      let recoveredCases = 0
      let deceasedCases = 0
      let activeCases = 0

      console.log('Response Data:', responseData)

      statesList.forEach(state => {
        if (responseData[state.state_code]) {
          const {total} = responseData[state.state_code]
          confirmedCases += total.confirmed
          recoveredCases += total.recovered
          deceasedCases += total.deceased
        }
      })
      activeCases += confirmedCases - (recoveredCases + deceasedCases)
      //   console.log(confirmedCases, recoveredCases, deceasedCases, activeCases)

      const listOfCovid19Data = statesList.map(eachState => ({
        stateName: eachState.state_name,
        stateCode: eachState.state_code,
        listOfConfirmed: Object.keys(responseData)
          .filter(stateKey => stateKey === eachState.state_code)
          .map(each => responseData[each].total.confirmed),
        listOfRecovered: Object.keys(responseData)
          .filter(stateKey => stateKey === eachState.state_code)
          .map(each => responseData[each].total.recovered),
        listOfDeceased: Object.keys(responseData)
          .filter(stateKey => stateKey === eachState.state_code)
          .map(each => responseData[each].total.deceased),
        listOfOthers: Object.keys(responseData)
          .filter(stateKey => stateKey === eachState.state_code)
          .map(each => responseData[each].total.tested),
        listOfPopulation: Object.keys(responseData)
          .filter(stateKey => stateKey === eachState.state_code)
          .map(each => responseData[each].meta.population),
      }))
      this.setState({
        covidData: listOfCovid19Data,
        totalConfirmed: confirmedCases,
        totalActive: activeCases,
        totalRecovered: recoveredCases,
        totalDeceased: deceasedCases,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-main-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#faf5f9" height={40} width={40} />
      </div>
    </div>
  )

  ascSort = () => {
    const {covidData} = this.state
    const ascSort = covidData.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a > b ? 1 : -1
    })
    this.setState({covidData: ascSort})
  }

  descSort = () => {
    const {covidData} = this.state
    const dscSort = covidData.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a < b ? 1 : -1
    })

    this.setState({covidData: dscSort})
  }

  renderCovid19SuccessView = () => {
    const {covidData} = this.state

    return (
      <div className="state-table-list-each-item-container">
        <div className="state-tables-heading-container">
          <div className="state-ascending-descending-container state-name">
            <p className="state-name-title ">State/UT</p>
            <button
              type="button"
              className="asc-dsc-buttons"
              onClick={this.ascSort}
            >
              <img
                src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1733911366/sort-asc_lezzvj.png"
                alt="asc"
                className="order-image"
              />
            </button>
            <button
              type="button"
              className="asc-dsc-buttons"
              onClick={this.descSort}
            >
              <img
                src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1733911366/sort_uisehd.png"
                alt="desc"
                className="order-image"
              />
            </button>
          </div>
          <p className="state-name-title confirm-numbers">Confirmed</p>
          <p className="state-name-title confirm-numbers">Active</p>
          <p className="state-name-title confirm-numbers">Recovered</p>
          <p className="state-name-title confirm-numbers">Deceased</p>
          <p className="state-name-title confirm-numbers">Population</p>
        </div>
        <hr />
        <ul className="un-ordered-state-list-container">
          {covidData.map(eachState => (
            <StateList
              homeCovid19Details={eachState}
              key={eachState.stateCode}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderStateWiseData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderCovid19SuccessView()
      default:
        return null
    }
  }

  renderStateCards = () => {
    const {
      totalConfirmed,
      totalActive,
      totalRecovered,
      totalDeceased,
    } = this.state
    return (
      <div className="covid19-home-cards-container">
        <div className="covid19-home-inside-container">
          <div className="confirm-cases-card">
            <h3>Confirmed</h3>
            <img
              src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1733218626/check-mark_1_jpb7wd.png"
              alt="confirmed"
              className=""
            />
            <h3>{totalConfirmed}</h3>
          </div>
          <div className="confirm-cases-card active-card">
            <h3>Active</h3>
            <img
              src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1733218625/protection_1_vs8wos.png"
              alt="active"
              className=""
            />
            <h3>{totalActive}</h3>
          </div>
          <div className="confirm-cases-card recover-card">
            <h3>Recovered</h3>
            <img
              src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1733218628/recovered_1_jdl6ht.png"
              alt="recovered"
              className=""
            />
            <h3>{totalRecovered}</h3>
          </div>
          <div className="confirm-cases-card decease-card">
            <h3>Deceased</h3>
            <img
              src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1733218626/breathing_1_bckaz5.png"
              alt="deceased"
              className=""
            />
            <h3>{totalDeceased}</h3>
          </div>
        </div>
      </div>
    )
  }

  onChangeSearchState = event => {
    if (event.target.value === '') {
      this.setState({showSearchSuggestions: false})
    } else {
      this.setState({
        searchInput: event.target.value,
        showSearchSuggestions: true,
      })
    }
  }

  render() {
    const {covidData, searchInput, showSearchSuggestions} = this.state
    const inputSearchCovidData = covidData.filter(eachState =>
      eachState.stateName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log('inputSearchCovidData:', inputSearchCovidData)
    return (
      <div className="main-container">
        <Header />
        <div className="main-home-container">
          <div className="search-input-main-container">
            <div className="search-icon-input-container">
              <img
                src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1733216880/search_fxxwj2.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Enter the State"
                onChange={this.onChangeSearchState}
              />
            </div>
          </div>
          {showSearchSuggestions ? (
            <ul className="search-suggestion-main-container">
              {inputSearchCovidData.map(eachState => (
                <li className="suggestions-list-container">
                  <p>{eachState.stateName}</p>
                  <div className="state-code-suggestion-container">
                    <p className="state-code">{eachState.stateCode}</p>
                    <img
                      src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1733925839/Line_l5oqdh.png"
                      alt="suggestion"
                      className="suggestion-image"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="home-cards-state-details-main-container">
              <div>{this.renderStateCards()}</div>
              {this.renderStateWiseData()}
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default HomePage
