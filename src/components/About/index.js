import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import FaqItem from '../FaqItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class About extends Component {
  state = {
    aboutFaqsList: [],
    aboutFactoidsList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getAboutFaqs()
  }

  getAboutFaqs = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const responseFaqs = await response.json()
      const faqsData = responseFaqs.faq.map(eachFaq => ({
        answer: eachFaq.answer,
        category: eachFaq.category,
        qno: eachFaq.qno,
        question: eachFaq.question,
      }))

      const factoidsData = responseFaqs.factoids.map(eachFact => ({
        id: eachFact.id,
        banner: eachFact.banner,
      }))

      this.setState({
        aboutFaqsList: faqsData,
        aboutFactoidsList: factoidsData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderAboutLoadingView = () => (
    <div className="about-loader-container" testid="aboutRouteLoader">
      <Loader type="TailSpin" color="#007BFF" height={30} width={30} />
    </div>
  )

  renderAboutSuccessView = () => {
    const {aboutFaqsList, aboutFactoidsList} = this.state
    console.log('factoidList:', aboutFactoidsList)
    return (
      <div>
        <h3>COVID-19 vaccines be ready for distribution</h3>
        <ul className="about-faqs-list-container" testid="faqsUnorderedList">
          {aboutFaqsList.map(eachFaq => (
            <FaqItem faqDetails={eachFaq} key={eachFaq.qno} />
          ))}
        </ul>
      </div>
    )
  }

  renderAboutFaqsData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderAboutSuccessView()
      case apiConstants.inProgress:
        return this.renderAboutLoadingView()
      case apiConstants.failure:
        return this.renderAboutFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-main-container">
        <Header />
        <div className="about-inside-container">
          <h1>About</h1>
          <p>Last update on march 28th 2021.</p>
          <div>{this.renderAboutFaqsData()}</div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default About
