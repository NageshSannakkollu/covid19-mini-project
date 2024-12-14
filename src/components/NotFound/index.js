import {Link} from 'react-router-dom'

// import Header from '../Header'
// import Footer from '../Footer'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-main-container">
      <div className="not-found-inside-container">
        <img
          src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1734152776/Group_7484_gmjzmo.png"
          alt="not-found-pic"
          className="not-found-image"
        />
        <h2>Page Not Found</h2>
        <p>
          we are sorry, the page you requested could not be found <br />
        </p>
        <p>Please go back to the homepage</p>
        <button type="button" className="home-button">
          <Link to="/state/AN" className="link-item">
            Home
          </Link>
        </button>
      </div>
    </div>
  </div>
)

export default NotFound
