const StateCards = props => {
  const {specificStateCardDetails} = props
  console.log(specificStateCardDetails)
  const {confirmed, recovered, deceased} = specificStateCardDetails
  const active = confirmed - (recovered + deceased)
  return (
    <div>
      <h3>State Cards</h3>
    </div>
  )
}

export default StateCards
