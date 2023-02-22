import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <h1 className="text-[15rem]">HomePage</h1>
      <Link to="/helperregister">
        <button className="border-[1px] border-black p-5">
          Helper Register
        </button>
      </Link>
      <Link to="/helperlogin">
        <button className="border-[1px] border-black p-5">Login</button>
      </Link>
      <Link to="/helpeeregister">
        <button className="border-[1px] border-black p-5">
          Helpee Register
        </button>
      </Link>
    </div>
  );
}

export default App;
