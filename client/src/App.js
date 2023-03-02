import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <h1 className="text-[15rem] text-black">HomePage</h1>
      <Link to="/register">
        <button className="border-[1px] border-black p-5">Register</button>
      </Link>
      <Link to="/login">
        <button className="border-[1px] border-black p-5">Login</button>
      </Link>
    </div>
  );
}

export default App;
