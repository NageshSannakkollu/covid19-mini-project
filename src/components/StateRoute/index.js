import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import StateCards from '../StateCards'
import TopDistrictCard from '../TopDistrictCard'
import Charts from '../Charts'
import './index.css'

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

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class StateRoute extends Component {
  state = {
    apiStatus: apiConstants.initial,
    finalStateData: [],
    stateTotalTested: 0,
    stateDate: '',
    stateName: '',
    id: '',
    defaultCategory: 'Confirmed',
    topDistrictsListData: [],
  }

  componentDidMount() {
    this.getSpecificState()
  }

  getSpecificState = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    // console.log('ID:', stateCode)
    this.setState({apiStatus: apiConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const responseData = await response.json()
      //   console.log(responseData[stateCode])
      const stateData = responseData[stateCode]
      const totalTested = responseData[stateCode].total.tested
      const checkStateCode = statesList.filter(
        eachState => eachState.state_code === stateCode,
      )
      const getStateName = checkStateCode[0].state_name
      const getDate = new Date(responseData[stateCode].meta.last_updated)
      const topDistrictList = stateData.districts
      const months = [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ]
      const formattedDate = `last update on ${
        months[getDate.getMonth()]
      } ${getDate.getDate()} ${getDate.getFullYear()}.`
      //   console.log(formattedDate)
      this.setState({
        finalStateData: [stateData],
        stateTotalTested: totalTested,
        stateDate: formattedDate,
        id: stateCode,
        stateName: getStateName,
        topDistrictsListData: topDistrictList,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  stateCategoryValue = value => {
    this.setState({defaultCategory: value})
  }

  getStateWiseCards = () => {
    const {finalStateData, defaultCategory} = this.state
    console.log('finalStateData:', finalStateData)
    return (
      <ul className="state-cards-main-container">
        {finalStateData.map(eachData => (
          <StateCards
            specificStateCardDetails={eachData.total}
            stateCategoryValue={this.stateCategoryValue}
            activeCategory={defaultCategory}
            key={eachData}
          />
        ))}
      </ul>
    )
  }

  getStateTopDistrictData = () => {
    const {topDistrictsListData, defaultCategory} = this.state
    // console.log('topDistrictsListData:', topDistrictsListData)
    const topDistricts = Object.keys(topDistrictsListData)
    const lowerCategory = defaultCategory.toLowerCase()
    const dataElement = topDistricts.map(eachItem => ({
      stateDistrictName: eachItem,
      stateDistrictValue: topDistrictsListData[eachItem].total[lowerCategory],
    }))
    dataElement.sort((a, b) => b.stateDistrictValue - a.stateDistrictValue)

    const stateDistrictActive = topDistricts.map(eachItem => ({
      stateDistrictName: eachItem,
      stateDistrictValue:
        topDistrictsListData[eachItem].total.confirmed -
        (topDistrictsListData[eachItem].total.recovered +
          topDistrictsListData[eachItem].total.deceased)
          ? topDistrictsListData[eachItem].total.confirmed -
            (topDistrictsListData[eachItem].total.recovered +
              topDistrictsListData[eachItem].total.deceased)
          : 0,
    }))

    stateDistrictActive.sort(
      (a, b) => b.stateDistrictValue - a.stateDistrictValue,
    )

    if (lowerCategory === 'active') {
      return stateDistrictActive
    }
    return dataElement
  }

  getStateTopDistricts = () => {
    const topDistrictData = this.getStateTopDistrictData()
    return (
      <div className="top-districts-main-container">
        <h2 className="top-districts-title">Top Districts</h2>
        <ul
          className="top-districts-main-list-container"
          testid="topDistrictsUnorderedList"
        >
          {topDistrictData.map(eachItem => (
            <TopDistrictCard
              topDistrictName={eachItem.stateDistrictName}
              topDistrictValue={eachItem.stateDistrictValue}
              key={eachItem.stateDistrictName}
            />
          ))}
        </ul>
      </div>
    )
  }

  getGraphsData = () => {
    const {defaultCategory, id} = this.state
    return (
      <div testid="lineChartsContainer" className="graphs-main-container">
        <Charts category={defaultCategory.toLowerCase()} stateCode={id} />
      </div>
    )
  }

  renderStateLoadingView = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <Loader type="Tai Spin" color="#faf5f9" height={50} width={50} />
    </div>
  )

  renderStateSuccessView = () => (
    <div className="state-wise-card-top-districts-graphs-container">
      {this.getStateWiseCards()}
      {this.getStateTopDistricts()}
      {this.getGraphsData()}
    </div>
  )

  renderStateFailureView = () => (
    <div className="not-found-main-container">
      <div className="not-found-inside-container">
        <img
          src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1734152776/Group_7484_gmjzmo.png"
          alt="not found"
          className="not-found-image"
        />
        <h2>Page Not Found</h2>
        <p>
          we’re sorry, the page you requested could not be found Please go back
          to the homepage
        </p>
        <button type="button" className="home-button">
          Home
        </button>
      </div>
    </div>
  )

  renderStateWiseMainData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderStateSuccessView()
      case apiConstants.inProgress:
        return this.renderStateLoadingView()
      case apiConstants.failure:
        return this.renderStateFailureView()
      default:
        return null
    }
  }

  render() {
    const {stateTotalTested, stateName, stateDate, defaultCategory} = this.state
    // console.log('defaultCata:', defaultCategory)
    return (
      <div className="individual-state-route-main-container">
        <Header />
        <div className="state-name-tested-details-container">
          <div className="main-state-name-last-updated-container">
            <h3 className="main-state-name">{stateName}</h3>
            <p>{stateDate}</p>
          </div>
          <div className="state-name-last-updated-container ">
            <p className="tested-tile">Tested</p>
            <p className="total-test-cases">{stateTotalTested}</p>
          </div>
        </div>
        <div
          className="state-wise-data-main-container"
          testid="stateWiseCovidDataTable"
        >
          <div className="state-wise-data-main-container">
            {this.renderStateWiseMainData()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default StateRoute
