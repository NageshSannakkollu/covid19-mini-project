import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-main-container">
    <div className="footer-inside-container">
      <h2>
        COVID19<span className="span-india">INDIA</span>
      </h2>
      <p className="footer-description">
        we stand with everyone fighting on the front lines
      </p>
      <div className="social-media-container">
        <VscGithubAlt alt="github" className="social-media-image" />
        <FiInstagram alt="instagram" className="social-media-image" />
        <FaTwitter alt="twitter" className="social-media-image" />
        {/* <img
          src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1733218625/Vector_8_fszkgi.png"
          alt="github"
          className="social-media-image"
        />
        <img
          src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1733218625/instagram_jdkw9t.png"
          alt="instagram"
          className="social-media-image"
        />
        <img
          src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1733218625/Twitter_bird_logo_2012_1_r41prn.png"
          alt="twitter"
          className="social-media-image"
        /> */}
      </div>
    </div>
  </div>
)
export default Footer
