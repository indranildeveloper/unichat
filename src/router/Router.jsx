import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Chats from "../pages/Chats";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<Login />} />
      <Route path="/chats" element={<Chats />} />
    </Route>
  )
);

export default Router;
