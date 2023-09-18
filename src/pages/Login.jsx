import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { app } from "../firebase";

const Login = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to UniChat</h2>
        <button
          className="login-button google"
          onClick={() => signInWithRedirect(auth, googleProvider)}
        >
          <FaGoogle /> Sign In with Google
        </button>
        {/* <br />
        <br />
        <button
          className="login-button facebook"
          onClick={() => signInWithRedirect(auth, facebookProvider)}
        >
          <FaFacebook /> Sign In with Facebook
        </button> */}
      </div>
    </div>
  );
};

export default Login;
