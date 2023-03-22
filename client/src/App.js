import "./App.css";
// import { Link } from "react-router-dom";
// import Logo from "./images/Good Deeds.png";

import { RiMentalHealthLine } from "react-icons/ri";
import { GiInnerSelf } from "react-icons/gi";
import { GiThreeFriends } from "react-icons/gi";
import Hero from "./images/homepage-hero.jpg";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import { IoIosPeople } from "react-icons/io";

import { TbHeartHandshake } from "react-icons/tb";
import { FaHands } from "react-icons/fa";
import Footer2 from "./components/Footer2";
import { FaFilter } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import { useState, useContext, useEffect, useCallback } from "react";
import { Context } from "./components/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "./components/Slider";

function App() {
  const [filter, setFilter] = useState({ task: "" });
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();

  // const handleResetFilter = () => {
  //   setFilter({ task: "" });
  // };

  const handleApplyFilter = useCallback(async () => {
    try {
      const response = await axios.post("/tasks/search", filter);
      console.log("(🇯🇲 handleApplyFilter listTasks", response);
      if (response.data.success) {
        dispatch({ type: "listTask", payload: response.data.task });
        navigate("/listtasks");
      }
    } catch (error) {
      console.error(error);
      alert("There is no request that match");
      // handle the error here
    }
  }, [filter, dispatch, navigate]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleApplyFilter();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleApplyFilter]);

  return (
    <div
      className="w-[screen] border-2 border-red-600 bg-[#eecdb2]
"
    >
      <div className="border-2  gap-5 max-w-[1280px] mx-auto min-w-[375px] overflow-hidden items-center bg-[#fff3e9] text-[#110931]">
        <Navbar />
        <header className="home-page-header w-[100%] min-w-[375px] relative">
          <div className="home-page-hero-content">
            <img className="homepage-hero-image" src={Hero} alt="" />
            <p className="homepage-hero-p">
              Join the Movement for Positive Social Change: Volunteer today!
            </p>
          </div>
        </header>

        <section className="homepage-search-bar">
          <div className="home-search-bar">
            <input
              placeholder="Search Requests"
              type="text"
              id="base-input"
              onChange={(e) => setFilter({ ...filter, task: e.target.value })}
              value={filter.task}
              className="home-search-input"
            />
          </div>
          {/* <div className="filter">
            <button
              type="button"
              onClick={handleApplyFilter}
              className="list-btn-1"
            >
              <FaFilter />
              Apply filter
            </button>
            <button
              type="button"
              onClick={handleResetFilter}
              className="list-btn-1"
            >
              <RiFilterOffFill />
              Reset filter
            </button>
          </div> */}
        </section>

        <section>
          <div className="benefits-container">
            <h3 className="benefits-h3">Benefits of Helping Others</h3>

            <div className="benefits-card-container">
              <div className="benefits-card">
                <RiMentalHealthLine className="benefits-icon text-red-600" />

                <p className="benefits-p-header">
                  Improves Physical and Mental Health
                </p>

                <p className="benefits-p">
                  Volunteering reduces stress and increases positive, relaxed
                  feelings by releasing dopamine. By spending time in service to
                  others, volunteers report feeling a sense of meaning and
                  appreciation, both given and received, which can have a
                  stress-reducing effect.
                </p>
              </div>
              <div className="benefits-card">
                <GiInnerSelf className="benefits-icon text-blue-500" />

                <p className="benefits-p-header">Provides a Sense of Purpose</p>

                <p className="benefits-p">
                  The work that volunteers provide is essential to everyday
                  activities, which gives volunteers a sense of purpose,
                  especially when volunteering in the areas they find
                  meaningful. Older volunteers experience greater increases in
                  life satisfaction and self-esteem.
                </p>
              </div>
              <div className="benefits-card">
                <GiThreeFriends className="benefits-icon text-purple-500" />

                <p className="benefits-p-header">
                  Nurture New and Existing Relationships
                </p>

                <p className="benefits-p">
                  Volunteering increases social interaction and helps build a
                  support system based on common interests. One of the best ways
                  to make new friends and strengthen existing relationships is
                  to participate in a shared activity.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="h-[500px]">
          <Carousel />
        </section>

        <section>
          <div className="about-us-container">
            <h3 className="about-us-h3">Who We Are</h3>
            <p className="about-us-p">
              Welcome to Good Deeds, a community volunteer organisation
              dedicated to connecting people and making a positive impact in
              your local area. Our organisation was founded on the belief that
              everyone has the power to make a difference and that small acts of
              kindness can have a big impact. We aim to bring people together
              and create a sense of community through volunteering and giving
              back. At Good Deeds, we offer a range of volunteer opportunities
              that cater to different interests and skillsets. Whether you're
              passionate about the environment, social justice, or helping those
              in need, we have a role for you. We believe that volunteering
              should be accessible to everyone, which is why we offer flexible
              hours and a supportive community to help you get started. Our
              volunteers are the heart and soul of our organisation, and we
              value their time and dedication. We aim to create a positive and
              inclusive environment where everyone feels welcome and valued. We
              believe that through our collective efforts, we can create a
              stronger and more connected community. Join us today and become a
              part of something bigger. Together, we can make a difference and
              create a brighter future for all.
            </p>
          </div>
        </section>
        <section>
          <div className="home-icons-section flex gap-[300px] justify-center pt-[30px] pb-[30px]">
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
        </section>
        <Footer2 />
      </div>
    </div>
  );
}

export default App;
