import "./App.css";
// import { Link } from "react-router-dom";
// import Logo from "./images/Good Deeds.png";

import { RiMentalHealthLine } from "react-icons/ri";
import { GiInnerSelf } from "react-icons/gi";
import { GiThreeFriends } from "react-icons/gi";
import Hero from "./images/homepage-hero.jpg";

import Footer2 from "./components/Footer2";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div
      className="w-[screen] border-2 border-red-600
"
    >
      <div className="border-2 border-black gap-5 max-w-[1280px] mx-auto min-w-[375px] overflow-hidden items-center bg-[#fff3e9] text-[#110931]">
        <Navbar />
        <header className="home-page-header w-[100%] min-w-[375px] relative">
          <div className="home-page-hero-content">
            <img className="homepage-hero-image" src={Hero} alt="" />
            <p className="homepage-hero-p">
              Join the Movement for Positive Social Change: Volunteer today!
            </p>
          </div>
        </header>

        {/* <Link to="/register">
            <button className="border-[1px] border-black p-5">Register</button>
          </Link>
          <Link to="/login">
            <button className="border-[1px] border-black p-5">Login</button>
          </Link>

          <Link to="/map">
            <button className="border-[1px] border-black p-5">Map</button>
          </Link> */}

        <section className="homepage-search-bar">
          <div>
            <p>SEARCH BAR GOES HERE</p>
          </div>
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
                  to participate in a shared activity. Dedicating time as a
                  volunteer helps expand social network and practice social
                  skills with others.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-us-container p-3 m-10">
          <h3 className="about-us-h3 text-[2rem]">Who We Are</h3>
          <p className="about-us-p">
            Welcome to Good Deeds, a community volunteer organisation dedicated
            to connecting people and making a positive impact in your local
            area. Our organisation was founded on the belief that everyone has
            the power to make a difference and that small acts of kindness can
            have a big impact. We aim to bring people together and create a
            sense of community through volunteering and giving back. At Good
            Deeds, we offer a range of volunteer opportunities that cater to
            different interests and skillsets. Whether you're passionate about
            the environment, social justice, or helping those in need, we have a
            role for you. We believe that volunteering should be accessible to
            everyone, which is why we offer flexible hours and a supportive
            community to help you get started. Our volunteers are the heart and
            soul of our organisation, and we value their time and dedication. We
            aim to create a positive and inclusive environment where everyone
            feels welcome and valued. We believe that through our collective
            efforts, we can create a stronger and more connected community. Join
            us today and become a part of something bigger. Together, we can
            make a difference and create a brighter future for all.
          </p>
        </section>
        <Footer2 />
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
