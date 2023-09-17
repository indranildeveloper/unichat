import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { getAuth } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { app } from "../firebase";

const Chats = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate("/");
  const auth = getAuth(app);
  const { user } = useAuth();

  const handleLogout = async () => {
    auth.signOut();
    navigate("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": import.meta.env.VITE_CHATENGINE_PROJECT_ID,
          "user-name": user.email,
          "user-secret": user.uid,
          "private-key": import.meta.env.VITE_CHATENGINE_PRIVATE_KEY,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users", formData, {
              headers: {
                "private-key": import.meta.env.VITE_CHATENGINE_PRIVATE_KEY,
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((error) => console.log(error));
        });
      });
  }, [user, navigate]);

  if (!user || loading) {
    return "Loading...";
  }

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">UniChat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Log Out
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={import.meta.env.VITE_CHATENGINE_PROJECT_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
