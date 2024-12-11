import {Link} from 'react-router-dom'
import './index.css'

const StateList = props => {
  const {homeCovid19Details} = props
  //   console.log(homeCovid19Details)
  const {
    stateCode,
    stateName,
    listOfConfirmed,
    listOfRecovered,
    listOfDeceased,
    listOfPopulation,
  } = homeCovid19Details

  const listOfActiveCases =
    listOfConfirmed[0] - (listOfRecovered[0] + listOfDeceased[0])
  return (
    <li className="state-list-items-container" key={stateCode}>
      <Link to={`/state/${stateCode}`} className="link-item">
        <p className="state-name-list">{stateName}</p>
      </Link>
      <p className="cases-container confirmed-color">{listOfConfirmed[0]}</p>
      <p className="cases-container active-color">{listOfActiveCases}</p>
      <p className="cases-container recover-color">{listOfRecovered[0]}</p>
      <p className="cases-container decease-color">{listOfDeceased[0]}</p>
      <p className="cases-container population-color">{listOfPopulation[0]}</p>
    </li>
  )
}

export default StateList
