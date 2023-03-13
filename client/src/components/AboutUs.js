import Hero from "../images/about-us-hero.jpg";
import Hands from "../images/hands.jpg";
import Kirk from "../images/kirk.jpg";
import Rami from "../images/rami.jpg";

const AboutUs = () => {
  return (
    <div>
      <section>
        <div className="about-us-hero-container relative">
          <img
            src={Hero}
            alt=""
            className="about-us-hero-image h-[500px] w-full object-cover "
          />
          <p className="about-us-hero-p absolute top-[200px] right-[200px] text-[3.5rem] text-yellow-300">
            Building Community One Good Deed At A Time
          </p>
        </div>
      </section>
      <section className="about-us-mission flex p-20 justify-between bg-[#ffbf48]">
        <div className="about-us-mission-div">
          <img
            src={Hands}
            alt=""
            className="about-us-mission-image h-[500px] w-[700px]"
          />
        </div>
        <div className="about-us-mission-div w-[900px] flex-col items-center justify-center p-6 relative">
          <h3 className="about-us-mission-h3 text-[3rem] text-[#5a125a]">
            Our Mission
          </h3>

          <p className="about-us-mission-p text-[1.5rem] top-[150px] absolute text-[#5a125a]">
            Our mission is to connect people from all walks of life,
            backgrounds, and experiences through volunteerism. We strive to
            build a more connected and compassionate community by facilitating
            volunteer opportunities that bring people together to address common
            challenges, support local causes, and make a positive impact. By
            fostering a culture of giving, collaboration, and empathy, we aim to
            inspire individuals to take action, create meaningful connections,
            and build a better world for everyone.
          </p>
        </div>
      </section>
      <section>
        <div className="about-us-team-container flex p-10 gap-50 justify-center items-center">
          <img src={Kirk} alt="" className="h-[700px] w-[500px]" />
          <img src={Rami} alt="" className="h-[500px] w-[500px]" />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
