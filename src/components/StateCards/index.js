import './index.css'

const confirmCard = {
  name: 'Confirmed',
  logoUrl:
    'https://res.cloudinary.com/dksgsqhdk/image/upload/v1733218626/check-mark_1_jpb7wd.png',
}

const activeCard = {
  name: 'Active',
  logoUrl:
    'https://res.cloudinary.com/dksgsqhdk/image/upload/v1733218625/protection_1_vs8wos.png',
}
const recoverCard = {
  name: 'Recovered',
  logoUrl:
    'https://res.cloudinary.com/dksgsqhdk/image/upload/v1733218628/recovered_1_jdl6ht.png',
}
const deceaseCard = {
  name: 'Deceased',
  logoUrl:
    'https://res.cloudinary.com/dksgsqhdk/image/upload/v1733218626/breathing_1_bckaz5.png',
}

const StateCards = props => {
  const {specificStateCardDetails, stateCategoryValue, activeCategory} = props
  //   console.log('specificStateCardDetails:', specificStateCardDetails)
  const {confirmed, recovered, deceased} = specificStateCardDetails
  const active = confirmed - (recovered + deceased)

  const clickOnConfirm = () => {
    stateCategoryValue('Confirmed')
  }
  const clickOnActive = () => {
    stateCategoryValue('Active')
  }
  const clickOnRecover = () => {
    stateCategoryValue('Recovered')
  }
  const clickOnDecease = () => {
    stateCategoryValue('Deceased')
  }

  return (
    <ul className="state-card-un-ordered-list-container">
      <li
        className="confirm-details-list"
        onClick={clickOnConfirm}
        key="confirmed"
        value="stateSpecificConfirmedCasesContainer"
        testid="stateSpecificConfirmedCasesContainer"
      >
        <p>{confirmCard.name}</p>
        <img
          src={confirmCard.logoUrl}
          alt="state specific confirmed cases pic"
          className=""
        />
        <p>{confirmed}</p>
      </li>
      <li
        onClick={clickOnActive}
        key="active"
        value="stateSpecificActiveCasesContainer"
        className="active-details-list"
        testid="stateSpecificActiveCasesContainer"
      >
        <p>{activeCard.name}</p>
        <img
          src={activeCard.logoUrl}
          alt="state specific active cases pic"
          className=""
        />
        <p>{active}</p>
      </li>
      <li
        onClick={clickOnRecover}
        key="recovered"
        value="stateSpecificRecoveredCasesContainer"
        className="recover-details-list"
        testid="stateSpecificRecoveredCasesContainer"
      >
        <p>{recoverCard.name}</p>
        <img
          src={recoverCard.logoUrl}
          alt="state specific recovered cases pic"
          className=""
        />
        <p>{recovered}</p>
      </li>
      <li
        onClick={clickOnDecease}
        key="deceased"
        value="stateSpecificDeceasedCasesContainer"
        className="decease-details-list"
        testid="stateSpecificDeceasedCasesContainer"
      >
        <p>{deceaseCard.name}</p>
        <img
          src={deceaseCard.logoUrl}
          alt="state specific deceased cases pic"
          className=""
        />
        <p>{deceased}</p>
      </li>
    </ul>
  )
}

export default StateCards
