import "./App.css";
import { Link } from "react-router-dom";
import Logo from "./images/Good Deeds.png";
import { RiMentalHealthLine } from "react-icons/ri";
import { GiInnerSelf } from "react-icons/gi";
import { GiThreeFriends } from "react-icons/gi";
// import Card from "react-bootstrap/Card";

function App() {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <img className="h-[200px] w-[200px]" src={Logo} alt="" />

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

      {/* <section>
        <div className="benefits-cards">
          <Card className="benefits-card">
            <Card.Img
              className="benefits-images"
              variant="top"
              src={RiMentalHealthLine}
            />
            <Card.Body className="flex justify-center items-center">
              <Card.Text className="benefits-card-text">
                Lesley-Ann Christl
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="about-us-card">
            <Card.Img
              className="about-us-team-images"
              variant="top"
              src={<RiMentalHealthLine />}
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
              src={GiThreeFriends}
            />
            <Card.Body className="flex justify-center items-center">
              <Card.Text className="about-us-card-text">Rami Basheer</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </section> */}
      <section>
        <div className="benefits-container">
          <h3 className="benefits-h3 text-[3rem] ml-[330px]">
            Benefits of Helping Others
          </h3>

          <div className="flex gap-20">
            <div className="w-[350px] p-5">
              <RiMentalHealthLine className="text-[100px] ml-[100px] text-red-600" />

              <p className="benefits-p-header font-bold">
                Improves Physical and Mental Health
              </p>

              <p>
                Volunteering reduces stress and increases positive, relaxed
                feelings by releasing dopamine. By spending time in service to
                others, volunteers report feeling a sense of meaning and
                appreciation, both given and received, which can have a
                stress-reducing effect.
              </p>
            </div>
            <div className="w-[350px] p-5">
              <GiInnerSelf className="text-[100px] ml-[100px] text-blue-500" />

              <p className="benefits-p-header font-bold ">
                Provides a Sense of Purpose
              </p>

              <p>
                The work that volunteers provide is essential to everyday
                activities, which gives volunteers a sense of purpose,
                especially when volunteering in the areas they find meaningful.
                Older volunteers experience greater increases in life
                satisfaction and self-esteem.
              </p>
            </div>
            <div className="w-[350px] p-5">
              <GiThreeFriends className="text-[100px] ml-[100px] text-purple-500" />

              <p className="benefits-p-header font-bold">
                Nurture New and Existing Relationships
              </p>

              <p>
                Volunteering increases social interaction and helps build a
                support system based on common interests. One of the best ways
                to make new friends and strengthen existing relationships is to
                participate in a shared activity. Dedicating time as a volunteer
                helps expand social network and practice social skills with
                others.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-us-container p-3 m-10">
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
