import "./AboutUs.css";
import Kirk from "../images/kirk.jpg";
import Rami from "../images/rami.jpg";
import Boi from "../images/boi.jpg";
import Lala from "../images/lala.jpg";
import Maya from "../images/angelou.jpg";
import GD from "../images/good-deeds.png";
import Card from "react-bootstrap/Card";
import Navbar from "./Navbar";
import Footer2 from "./Footer2";

const AboutUs = () => {
  return (
    <div className="flex max-w-full flex-col bg-[#FFF3E9] text-[#110931]">
      <Navbar />
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
              volunteers with a variety of different people and projects. So, we
              decided to start our own volunteer organization. Together, we
              formed a small team and started researching the needs of our
              community. We found that there are so many people that could
              benefit from short-term volunteer help. We created a website to
              spread the word and promote our cause. We are now able to match
              volunteers with a variety of people in their community. Over time,
              we hope our organization will grow and we are able to expand our
              services to other communities in need and make a meaningful impact
              on the world.
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
            <h3 className="about-us-team-h3">Leadership Members</h3>
          </div>

          <div className="about-us-team-cards">
            <Card className="about-us-card">
              <Card.Img
                className="about-us-team-images"
                variant="top"
                src={Lala}
              />
              <Card.Body className="flex justify-center items-center">
                <Card.Text className="about-us-card-text">
                  Lesley-Ann Christl
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="about-us-card">
              <Card.Img
                className="about-us-team-images"
                variant="top"
                src={Kirk}
              />
              <Card.Body className="flex justify-center items-center">
                <Card.Text className="about-us-card-text">
                  Kirk McDowell
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="about-us-card">
              <Card.Img
                className="about-us-team-images"
                variant="top"
                src={Rami}
              />
              <Card.Body className="flex justify-center items-center">
                <Card.Text className="about-us-card-text">
                  Rami Basheer
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="about-us-card">
              <Card.Img
                className="about-us-team-images"
                variant="top"
                src={Boi}
              />
              <Card.Body className="flex justify-center items-center">
                <Card.Text className="about-us-card-text">
                  Boi Schrader
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>

      <Footer2 />
    </div>
  );
};

export default AboutUs;
