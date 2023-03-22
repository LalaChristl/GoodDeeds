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
      <Footer2 />
    </div>
  );
}
export default Contact;
