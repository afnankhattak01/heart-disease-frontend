import "./App.css";
import Signup from "./pages/signup";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { RouteGurad } from "./helpers/routeGuard";
import HomePage from "./pages/protectedPages/homepage";
import GraceCalculator from "./pages/protectedPages/gracecalculator";
import FraminghamScore from "./pages/protectedPages/framinghamcalculator";
import TimiScoreCalc from "./pages/protectedPages/timiCalcl";
import DownloadRecord from "./pages/protectedPages/downloadrecord";
import ForgetPassword from "./pages/forgetpassword";
import PasswordReset from "./pages/passwordreset";
import NotFound from "./pages/notfound";
import Profile from "./pages/profile";
import { Loginhook } from "./hooks/loginhook";
import UserHook from "./hooks/userhook";

function App() {
  const data = UserHook();

  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={data?.user ? <Navigate to="/home" /> : <Login />}
          />

          <Route
            path="/user/createaccount/new/signup"
            element={data?.user ? <Navigate to="/home" /> : <Signup />}
          />

          <Route
            path="/home"
            element={
              <RouteGurad>
                <HomePage />
              </RouteGurad>
            }
          />

          <Route
            path="/home/gracecalculator"
            element={
              <RouteGurad>
                <GraceCalculator />{" "}
              </RouteGurad>
            }
          />

          <Route
            path="/home/calculateFramingham"
            element={
              <RouteGurad>
                <FraminghamScore />{" "}
              </RouteGurad>
            }
          />

          <Route
            path="/home/calculateTimiScore"
            element={
              <RouteGurad>
                <TimiScoreCalc />{" "}
              </RouteGurad>
            }
          />

          <Route
            path="/downloadpreviosrecord"
            element={
              <RouteGurad>
                <DownloadRecord />{" "}
              </RouteGurad>
            }
          />

          <Route path="/forgetPassword" element={<ForgetPassword />} />

          <Route path="/profile" element={<Profile />} />

          <Route
            path="/resetpassword/:resettoken"
            element={<PasswordReset />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
