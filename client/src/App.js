import "./App.css";
import { Link } from "react-router-dom";
import Logo from "./images/Good Deeds.png";

function App() {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <img className="h-[200px] w-[200px]" src={Logo} alt="" />
      {/* <h1 className="text-[5rem] text-purple-500"> Good Deeds</h1> */}
      <p className="good-deeds-slogan">
        Join the Movement for Positive Social Change: Volunteer Peer-to-Peer and
        make an impact in your area today!
      </p>
      <h2 className="text-[5rem] text-black">Home Page</h2>
      <Link to="/register">
        <button className="border-[1px] border-black p-5">Register</button>
      </Link>
      <Link to="/login">
        <button className="border-[1px] border-black p-5">Login</button>
      </Link>

      <Link to="/map">
        <button className="border-[1px] border-black p-5">Map</button>
      </Link>

      <section className="about-us-container border-[2px] border-pink-500 p-3">
        <h3 className="about-us-h3 text-[2rem]">ABOUT US:</h3>
        <p className="about-us-p">
          Welcome to Good Deeds, a community volunteer organisation dedicated to
          connecting people and making a positive impact in your local area. Our
          organisation was founded on the belief that everyone has the power to
          make a difference and that small acts of kindness can have a big
          impact. We aim to bring people together and create a sense of
          community through volunteering and giving back. At Good Deeds, we
          offer a range of volunteer opportunities that cater to different
          interests and skillsets. Whether you're passionate about the
          environment, social justice, or helping those in need, we have a role
          for you. We believe that volunteering should be accessible to
          everyone, which is why we offer flexible hours and a supportive
          community to help you get started. Our volunteers are the heart and
          soul of our organisation, and we value their time and dedication. We
          aim to create a positive and inclusive environment where everyone
          feels welcome and valued. We believe that through our collective
          efforts, we can create a stronger and more connected community. Join
          us today and become a part of something bigger. Together, we can make
          a difference and create a brighter future for all.
        </p>
      </section>
    </div>
  );
}

export default App;
