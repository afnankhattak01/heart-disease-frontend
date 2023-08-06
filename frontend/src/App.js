import "./App.css";
import Signup from "./pages/signup";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RouteGurad } from "./helpers/routeGuard";
import { UserContextProvider } from "./context/userContext";
import HomePage from "./pages/protectedPages/homepage";
import GraceCalculator from "./pages/protectedPages/gracecalculator";
import FraminghamScore from "./pages/protectedPages/framinghamcalculator";
import TimiScoreCalc from "./pages/protectedPages/timiCalcl";
import DownloadRecord from "./pages/protectedPages/downloadrecord";
import ForgetPassword from "./pages/forgetpassword";
import PasswordReset from "./pages/passwordreset";
import NotFound from "./pages/notfound";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/user/createaccount/new/signup" element={<Signup />} />

          <Route
            path="/home"
            element={
              <RouteGurad>
                <HomePage />{" "}
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

          <Route
            path="/resetpassword/:resettoken"
            element={<PasswordReset />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
