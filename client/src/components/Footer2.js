import "./Footer2.css";
import Play from "../images/playstore-badge-en.png";
import Apple from "../images/appstore-badge-en.png";

import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { BsTwitter } from "react-icons/bs";

// import { ImInfinite } from "react-icons/im";

const Footer2 = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-top">
          <h3 className="footer-h3">Good Deeds</h3>
          <p className="footer-p text-[#2257ab]">
            Building Community One Good Deed At a Time
          </p>
        </div>

        <div className="footer-apps-container">
          <div className="footer-socials">
            <BsFacebook className="social" />
            <GrInstagram className="social" />
            <BsTwitter className="social" />
          </div>
          <div className="footer-apps">
            <img src={Play} alt="" className="w-[126px] h-[42px]" />
            <img src={Apple} alt="" className="w-[126px] h-[42px]" />
          </div>
        </div>

        <div className="footer-copyright">
          <p>
            © {new Date().getFullYear()} Good Deeds Inc. | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
