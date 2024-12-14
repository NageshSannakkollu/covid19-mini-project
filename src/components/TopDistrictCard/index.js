import './index.css'

const TopDistrictCard = props => {
  const {topDistrictName, topDistrictValue} = props
  return (
    <li className="top-district-list-container">
      <p className="district-name">{topDistrictValue}</p>
      <p className="district-value">{topDistrictName}</p>
    </li>
  )
}

export default TopDistrictCard
