import Navbar from "./Navbar";
import "./Contact.css";
import { BsMailbox } from "react-icons/bs";
import Footer2 from "./Footer2";

function Contact() {
  function sendEmail() {
    const userEmail = document.getElementById("user-email").value;
    const recipientEmail = "your-email@example.com"; // replace with your email address
    const subject = "Contact Request";
    const emailLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(userEmail)}`;
    window.open(emailLink);
  }

  return (
    <div className="w-[screen] ">
      <div className="border-2  gap-5 max-w-[1280px] mx-auto min-w-[375px] overflow-hidden items-center bg-[#fff3e9] text-[#110931]">
        <div className="contact-main">
          <Navbar />
          <div className="contact-header">
            <h1 className="contact-heading">Contact Us</h1>
          </div>
          <div>
            <p className="contact-email">
              <label htmlFor="">
                <input type="email" id="user-email" className="contact-input" />
                Please enter your email
              </label>
              <BsMailbox
                value=""
                className="contact-icon"
                onClick={sendEmail}
                title="Send Email"
              />
            </p>
          </div>
        </div>
        <Footer2 />
      </div>
    </div>
  );
}
export default Contact;
