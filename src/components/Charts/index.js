import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Line,
  LineChart,
} from 'recharts'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Charts extends Component {
  state = {
    chartsListGraphs: [],
    chartsDataBarChart: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getChartsData()
  }

  getChartsData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {stateCode} = this.props
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const chartsData = await response.json()
      // console.log('chartsData:', chartsData)
      const chartsDatesList = Object.keys(chartsData[stateCode].dates)
      const mainChartsData = chartsDatesList.map(eachDate => ({
        eachDate,
        confirmed: chartsData[stateCode].dates[eachDate].total.confirmed,
        recovered: chartsData[stateCode].dates[eachDate].total.recovered,
        deceased: chartsData[stateCode].dates[eachDate].total.deceased,
        tested: chartsData[stateCode].dates[eachDate].total.tested,
        active:
          chartsData[stateCode].dates[eachDate].total.confirmed -
          (chartsData[stateCode].dates[eachDate].total.deceased +
            chartsData[stateCode].dates[eachDate].total.recovered),
      }))
      const mainGraphsData = chartsDatesList.map(eachDate => ({
        eachDate,
        confirmed: chartsData[stateCode].dates[eachDate].total.confirmed,
        recovered: chartsData[stateCode].dates[eachDate].total.recovered,
        deceased: chartsData[stateCode].dates[eachDate].total.deceased,
        tested: chartsData[stateCode].dates[eachDate].total.tested,
        active:
          chartsData[stateCode].dates[eachDate].total.confirmed -
          (chartsData[stateCode].dates[eachDate].total.deceased +
            chartsData[stateCode].dates[eachDate].total.recovered),
      }))

      this.setState({
        chartsDataBarChart: mainChartsData,
        chartsListGraphs: mainGraphsData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  graphList = (categoryName, color) => {
    const {chartsListGraphs} = this.state
    return (
      <div className="lineChartsContainer">
        <LineChart width={670} height={250} data={chartsListGraphs}>
          <XAxis
            dataKey="eachData"
            style={{fontFamily: 'Roboto', fontWeight: 500}}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={categoryName} stroke={color} />
        </LineChart>
      </div>
    )
  }

  getGraphsList = () => (
    <div className="bar-graphs-line-graphs-container">
      <h2 className="daily-spread-trends">Daily Spread Trends</h2>
      <div className="line-graphs-container">
        <div className="confirm-container">
          {this.graphList('confirmed', '#FF073A')}
        </div>
        <div className="active-container">
          {this.graphList('active', '#0A4FA0')}
        </div>
        <div className="recover-container">
          {this.graphList('recovered', '#216837')}
        </div>
        <div className="decease-container">
          {this.graphList('deceased', '#474C57')}
        </div>
        <div className="tested-container">
          {this.graphList('tested', '#9673B9')}
        </div>
      </div>
    </div>
  )

  renderChartsLoadingView = () => (
    <div testid="timelinesDataLoader">
      <Loader type="Tail Spin" color="#fafafa" width={30} height={30} />
    </div>
  )

  renderChartsSuccessView = () => {
    const {chartsDataBarChart} = this.state
    const {category} = this.props
    const topTenMaxDataChart = chartsDataBarChart.slice(
      Math.max(chartsDataBarChart.length - 10, 0),
    )

    // console.log('topTenMaxDataChart:', topTenMaxDataChart)

    let barColor = '#9A0E31'

    if (category === 'confirmed') {
      barColor = '#9A0E31'
    } else if (category === 'active') {
      barColor = '#0A4FA0'
    } else if (category === 'recovered') {
      barColor = '#216837'
    } else if (category === 'deceased') {
      barColor = '#474C57'
    } else if (category === 'tested') {
      barColor = '##9673B9'
    }
    return (
      <div>
        <div className="bar-graph-main-container" testid="lineChartsContainer">
          <BarChart width={700} height={400} data={topTenMaxDataChart}>
            <XAxis dataKey="eachDate" stroke={`${barColor}`} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="confirmed"
              fill={`${barColor}`}
              name="confirmed"
              label={{position: 'top', fill: `${barColor}`}}
            />
          </BarChart>
        </div>
        <div className="all-graphs-container">{this.getGraphsList()}</div>
      </div>
    )
  }

  renderChartsFailureView = () => (
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
          <Link to="/">Home</Link>
        </button>
      </div>
    </div>
  )

  renderGraphsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderChartsSuccessView()
      case apiConstants.inProgress:
        return this.renderChartsLoadingView()
      case apiConstants.failure:
        return this.renderChartsFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="all-graphs-main-container">{this.renderGraphsView()}</div>
    )
  }
}

export default Charts
