import "./App.css";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <Navbar/>
      <h1 className="text-[15rem] text-black">HomePage</h1>
        <Link to="/register">
          <div className='shadow-md shadow-[#1E1D1D] hover:scale-110 duration-500'>
            <button className="border-[1px] border-black p-5">Register</button>
          </div>
        </Link>
        <Link to="/login">
          <div className='shadow-md shadow-[#1E1D1D] hover:scale-110 duration-500'>
            <button className="border-[1px] border-black p-5">Login</button>
          </div>
        </Link>
        <Link to="/map">
          <div className='shadow-md shadow-[#1E1D1D] hover:scale-110 duration-500'>
            <button className="border-[1px] border-black p-5">Map</button>
          </div> 
        </Link>
    </div>
  );
}

export default App;
