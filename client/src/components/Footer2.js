import "./Footer2.css";
import Play from "../images/playstore-badge-en.png";
import Logo from "../images/logo-footer.png";

const Footer2 = () => {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <img src={Logo} alt="" className="footer-logo" />
        </div>
        <div>{/* <img src={Play} alt="" className="play" /> */}</div>
        <p>
          © {new Date().getFullYear()} Good Deeds Inc. | All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer2;
