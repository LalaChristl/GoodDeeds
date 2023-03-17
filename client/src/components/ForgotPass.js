import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

// import "../styles/ForgotPass.css";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const notify = () =>
//   toast.info(
//     "We have sent you an email with instructions about how to change your password",
//     {
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     }
//   );

const ForgotPass = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });

  const handleSubmit = async () => {
    const response = await axios.post("/users/forgotpass", data);
    console.log("🦩 ~ handleSubmit ~ response", response);

    if (response.data.success)
      alert(
        "We have sent you an email with instructions about how to change your password"
      );
    // notify();
  };

  const handleNavLogin = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="flex max-w-full flex-col items-center bg-[#fff3e9] text-[#110931]">
        <div className="flex mt-40 mb-60 h-full">
          <div className="forgot-container flex justify-center">
            <div
              className="forgot-box flex flex-col border w-96 items-center justify-center gap-4 p-10  bg-[#ffaf66] rounded-xl shadow-md"
              style={{ boxShadow: "0px 4px 8px rgba(25, 14, 3, 0.4)" }}
            >
              <h1 className="text-5xl font-bold text-[#110931]">
                Please enter your email
              </h1>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Email"
                className="border border-[#ffaf66] rounded-lg p-2 w-full text-[#110931]"
              />
              <button
                className="forgot-button border border-black rounded-lg py-2 px-4 bg-[#0d2237] text-white hover:scale-110 duration-500 "
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>

              <p
                className="forgot-pass-p border border-black rounded-lg py-2 px-4 bg-[#0d2237] text-white hover:scale-110 duration-500  "
                onClick={handleNavLogin}
              >
                Login
              </p>
              {/* <ToastContainer /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
