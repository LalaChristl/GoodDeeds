import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    languages: "",
  });

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [languages, setLanguages] = useState(user.languages);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/users/getuser/" + id);
        console.log("🦩 ~ fetchData ~ response:", response);

        if (response.data.success) setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const handleSave = async () => {
    console.log("hello");
    const updatedUser = { ...user, firstName, lastName, email };
    const response = await axios.put("/users/edituser", updatedUser);
    console.log("handleSave ~ response", response.data);
    if (response.data.success) navigate("/helperprofile/getuser/" + id);
  };

  return (
    <div>
      <h1 className="edit-helper-profile-h1 text-black text-[4rem]">
        Edit User Information
      </h1>

      <label className="edit-helper-profile-label text-black text-[1.5rem]">
        First Name:
        <input
          type="text"
          value={firstName || user.firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="edit-helper-profile-input border-[1px] border-black"
        />
      </label>
      <br />
      <label className="edit-helper-profile-label text-black text-[1.5rem]">
        Last Name:
        <input
          type="text"
          value={lastName || user.lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="edit-helper-profile-input border-[1px] border-black"
        />
      </label>
      <br />
      <label className="edit-helper-profile-label text-black text-[1.5rem]">
        Email:
        <input
          type="email"
          value={email || user.email}
          onChange={(e) => setEmail(e.target.value)}
          className="edit-helper-profile-input border-[1px] border-black"
        />
      </label>
      <br />
      <label className="edit-helper-profile-label text-black text-[1.5rem]">
        Languages:
        <input
          type="text"
          value={languages || user.languages}
          onChange={(e) => setLanguages(e.target.value)}
          className="edit-helper-profile-input border-[1px] border-black"
        />
      </label>

      <br />
      <button
        type="submit"
        onClick={handleSave}
        className="edit-helper-profile-button border-[1px] border-black"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditUserPage;