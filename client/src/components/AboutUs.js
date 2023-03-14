import "./AboutUs.css";
import Kirk from "../images/kirk.jpg";
import Rami from "../images/rami.jpg";
import Boi from "../images/boi.jpg";
import Lala from "../images/lala.jpg";
import Maya from "../images/angelou.jpg";
import GD from "../images/good-deeds.png";

const AboutUs = () => {
  return (
    <div className="flex max-w-full flex-col bg-[#FFF3E9] text-[#110931]">
      <section>
        <div className="about-us-hero-container">
          <p className="about-us-hero-p">
            Building Community One Good Deed At A Time
          </p>
        </div>
      </section>
      <section className="about-us-mission-container">
        <div className="about-us-mission-div-1">
          <img src={GD} alt="" className="about-us-mission-image" />
        </div>
        <div className="about-us-mission-div-2">
          <h3 className="about-us-mission-h3">Our Mission</h3>

          <p className="about-us-mission-p">
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
        <div className="about-us-history-container">
          <div className="about-us-history-div-1">
            <h3 className="about-us-history-h3">Our History</h3>

            <p className="about-us-history-p">
              We were searching for meaningful ways to give back to our
              community. We looked into various volunteer opportunities, but we
              found that most organizations were focused on specific causes and
              required a long-term commitment, which didn't fit with our busy
              schedules. We realized that there was a gap in the market for a
              flexible, short-term volunteer organization that could match
              volunteers with a variety of different people and projects.
              Inspired by this idea, we decided to start our own volunteer
              organization. We reached out to friends and acquaintances who were
              also interested in volunteering but faced similar challenges.
              Together, we formed a small team and started researching the needs
              of our community. We found that there are so many people that
              could benefit from short-term volunteer help. Next, we set out to
              recruit volunteers. We created a website to spread the word and
              promote our cause. We are now able to match volunteers with a
              variety of people and projects in their community. Over time, we
              hope our organization will grow and we are able to expand our
              services to other communities in need. We aim to have a reputation
              for providing high-quality volunteer experiences and for making a
              meaningful impact on our community. Today, our volunteer
              organization is starting to thrive, thanks to the hard work and
              dedication of our team and the volunteers who support us.
            </p>
          </div>
          <div className="about-us-history-div-2">
            <img src={Maya} alt="" className="about-us-history-image" />
          </div>
        </div>
      </section>
      <section>
        <div className="about-us-team-container">
          <div>
            <h3 className="about-us-team-h3">Founding Members</h3>
          </div>
          <div className="about-us-team-images">
            <div>
              <img src={Lala} alt="" className="team-image" />
              <p>Lesley-Ann Christl</p>
            </div>
            <div>
              <img src={Kirk} alt="" className="team-image" />
              <p>Kirk McDowell</p>
            </div>
            <div>
              <img src={Boi} alt="" className="team-image" />
              <p>Boi Schrader</p>
            </div>
            <div>
              <img src={Rami} alt="" className="team-image" />
              <p>Rami Basheer</p>
            </div>
          </div>
        </div>
      </section>

      <footer>FOOTER</footer>
    </div>
  );
};

export default AboutUs;
