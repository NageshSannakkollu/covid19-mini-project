import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="main-nav-header-container">
    <Link to="/" className="link-item">
      <h3 className="header-covid-india-title">
        COVID19<span className="span-india">INDIA</span>
      </h3>
    </Link>
    <ul className="header-home-about-list-container">
      <Link to="/" className="link-item">
        <li>Home</li>
      </Link>
      <Link to="/about" className="link-item">
        <li>About</li>
      </Link>
    </ul>
  </div>
)

export default Header
