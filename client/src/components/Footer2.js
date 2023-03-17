import "./Footer2.css";
import Play from "../images/playstore-badge-en.png";
import Apple from "../images/appstore-badge-en.png";

import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { BsTwitter } from "react-icons/bs";

// import { ImInfinite } from "react-icons/im";
import { IoIosPeople } from "react-icons/io";

import { TbHeartHandshake } from "react-icons/tb";
import { FaHands } from "react-icons/fa";

const Footer2 = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-[3.5rem] text-[#2257ab]">Good Deeds</h3>
          <p className="text-[1.5rem] text-[#2257ab]">
            Building Community One Good Deed At a Time
          </p>
        </div>
        <div className="flex gap-[300px] mt-[20px]">
          <div className="flex justify-center items-center flex-col">
            <IoIosPeople className="h-[75px] w-[75px]" />
            <p>Connect</p>
          </div>
          <div className="flex justify-center items-center flex-col">
            <TbHeartHandshake className="h-[75px] w-[75px]" />
            <p>Engage</p>
          </div>
          <div className="flex justify-center items-center flex-col">
            <FaHands className="h-[75px] w-[75px]" />
            <p>Empower</p>
          </div>
        </div>
        <div className="footer-apps">
          <BsFacebook className="h-[35px] w-[50px]" />
          <GrInstagram className="h-[35px] w-[50px]" />
          <BsTwitter className="h-[35px] w-[50px]" />
          <img src={Play} alt="" className="w-[126px] h-[42px]" />
          <img src={Apple} alt="" className="w-[126px] h-[42px]" />
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
