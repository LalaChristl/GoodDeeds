import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer2 from "./Footer2";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

const EditUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    image: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    languages: "",
    about: "",
  });
  // const [image, setImage] = useState(user.image);
  // const [userName, setUserName] = useState(user.userName);
  // const [firstName, setFirstName] = useState(user.firstName);
  // const [lastName, setLastName] = useState(user.lastName);
  // const [email, setEmail] = useState(user.email);
  // const [languages, setLanguages] = useState(user.languages);
  // const [about, setAbout] = useState(user.about);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/users/getuser2/" + id);
        console.log("🦩 ~ fetchData ~ response:", response);

        if (response.data.success) setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const handleUpload = (img) => {
    if (!img) return;
    if (img.type === "image/png" || img.type === "image/jpeg") {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "Volunteer");
      data.append("cloud_name", "dtbrznssn");
      fetch("https://api.cloudinary.com/v1_1/dtbrznssn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Uploaded", data.url);
          // setImage(data.url); // Set the image state variable with the uploaded image
          setUser((prev) => ({ ...prev, image: data.url }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      // image,
      // userName,
      // firstName,
      // lastName,
      // email,
      // languages,
      // about,
    };
    const response = await axios.put("/users/edituser2", user);
    console.log("handleSave ~ response", response.data);
    if (response.data.success) navigate("/helpeeprofile/getuser2/" + id);
  };

  const handleCancel = () => {
    navigate("/helpeeprofile/getuser2/" + id);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          gap: 5,
          maxWidth: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 25,
          background:
            "linear-gradient(90deg, rgba(0,82,70,1) 0%, rgba(196,252,240,1) 100%)",
          color: "black",
        }}
      >
        <Paper
          sx={{
            p: 4,
            mt: 8,
            mb: 25,
            maxWidth: 460,
            backgroundColor: "#ff7e36",
            opacity: [1, 1, 1],
            boxShadow: 10,
          }}
        >
          <Typography
            variant="h2"
            align="center"
            mb={0}
            sx={{ color: "white" }}
          >
            Edit Profile
          </Typography>
          <div className="flex justify-center items-center mt-5">
            <img
              className="rounded-full h-28 w-28 border-4 border-white"
              src={user.image}
              alt="avatar"
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <Button
              variant="contained"
              component="label"
              mt={2}
              mb={2}
              onClick={() => document.getElementById("image-input").click()}
              sx={{ backgroundColor: "#018f8c" }}
              size="small"
            >
              Upload Image
              <input
                id="image-input"
                type="file"
                hidden
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </Button>
          </div>
          <TextField
            fullWidth
            label="User Name"
            name="userName"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />

          <TextField
            fullWidth
            label="Languages"
            name="languages"
            value={user.languages}
            onChange={(e) => setUser({ ...user, languages: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
          <TextField
            fullWidth
            label="About Me"
            name="about"
            value={user.about}
            onChange={(e) => setUser({ ...user, about: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />

          <div className="flex justify-center items-center mt-10">
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#018f8c" }}
              size="large"
              fullWidth
              type="submit"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
          <div className="flex justify-center items-center mt-5">
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#018f8c" }}
              size="large"
              fullWidth
              type="submit"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Paper>
      </Box>
      <Footer2 />
    </>
  );
};

export default EditUserPage;
