import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUserPage = () => {
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/users/getusers/' + id);
        console.log(response);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const updatedUser = { ...user, firstName, lastName, email };
    const response = await axios.patch('/users/editProfile', updatedUser);
    console.log("handleSave ~ response", response);
    if (response.data.success) navigate('/helperProfile');
  }

  return (
    <div>
      <h1>Edit User Information</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName || user.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName || user.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email || user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />

        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserPage;