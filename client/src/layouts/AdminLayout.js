import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Context } from "../components/Context";
// import Navbar from "../components/Navbar";

function AdminLayout() {
  const { state } = useContext(Context);

  if (state.user._id) {
    return (
      <div>
        {/* <Navbar /> */}
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default AdminLayout;
