import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import StateCards from '../StateCards'
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
    category: 'Confirmed',
  }

  componentDidMount() {
    this.getSpecificState()
  }

  getSpecificState = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    console.log('ID:', stateCode)
    this.setState({apiStatus: apiConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const responseData = await response.json()
      console.log(responseData[stateCode])
      const stateData = responseData[stateCode]
      const totalTested = responseData[stateCode].total.tested
      const checkStateCode = statesList.filter(
        eachState => eachState.state_code === stateCode,
      )
      const getStateName = checkStateCode[0].state_name
      const getDate = new Date(responseData[stateCode].meta.last_updated)

      console.log(getStateName, getDate)
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
      console.log(formattedDate)
      this.setState({
        finalStateData: stateData,
        stateTotalTested: totalTested,
        stateDate: formattedDate,
        stateName: getStateName,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getStateWiseCards = () => {
    const {finalStateData} = this.state
    return (
      <div>
        <StateCards specificStateCardDetails={finalStateData.total} />
      </div>
    )
  }

  render() {
    const {stateTotalTested, stateName, stateDate} = this.state
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
        <div>{this.getStateWiseCards()}</div>
        <Footer />
      </div>
    )
  }
}

export default StateRoute
